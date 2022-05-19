import {getCLS, getFID, getLCP, getTTFB} from 'web-vitals';

let API_ENDPOINT = ''
function generateId() {
  return Math.random().toString(36).substr(2, 20);
};

// Threshold to weed out insignificant Layout Shift events
const CLS_THRESHOLD = .02;
// Simple generic session ID that will help us query all events on a given session
if (!sessionStorage.getItem('HNY_TRACE')) {
  sessionStorage.setItem('HNY_TRACE', `_${generateId()}`);
}
const trace_id = sessionStorage.getItem('HNY_TRACE')
let parentSpan = null;
let metadata = {};



// This method is called on initial load and lets us capture all metadata
// about the browser and device that might help us dig into patterns
function captureMetadata() {
  metadata = {
    name: 'web_performance',
    pathname: document.location.pathname, 
    // Pixel dimensions of the visible screen
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    // Browser string
    browser: navigator.userAgent,
    trace_id
  }

  if (navigator.userAgentData) {
    // Platform info reported by browser
    metadata.platform =  navigator.userAgentData.platform || null;
    // Browser vendor
    metadata.vendor = navigator.userAgentData.vendor || null;
  }
}

// -----------------------------------
// FIRST INPUT DELAY (FID) Observability
// -----------------------------------

// Grab the url of every script on the page and determine if the script
// is loaded asynchronously and deferred
function captureScriptData() {
  let inlineCounter = 0;
  const data = {}
  Array.prototype.forEach.call(document.scripts, (script) =>{
    let filename = `inlineScript${inlineCounter}`
    let path;
    if (script.src) {
      path = new URL(script.src);
      filename = path.pathname.substr(path.pathname.lastIndexOf('/')+ 1);
    } else {
      inlineCounter += 1;
    }

    return data[filename] = {
      filename,
      deferred: script.hasAttribute('defer'),
      async: script.hasAttribute('asynnc'),
      url: path ? path.href : 'inline',
    }
  });

  return data;
}

// Get all available performance measures. Next creates before-hydration, hydration, by default.
function getPerformanceMeasures() {
  const output = {};
  [...performance.getEntriesByType('measure')].forEach((measure) => {
    output[measure.name] = measure.duration;
  });
  return output;
}

// Handler for First Input Delay
function reportScriptTiming(metric) {
  const report = {
    span_event: metric.name,
    fid_value: metric.value,
    fid_delta: metric.delta,
    scriptsOnPage: document.scripts.length,
    scripts: captureScriptData(),
    ...getPerformanceMeasures(),
    ...metadata
  }
  send(report);
}

// ----------------------------------------------
// CUMULATIVE LAYOUT SHIFT (CLS) Observability
// ----------------------------------------------

// Loops through all CLS events (there can be dozens) to filter out minor ones
// and then pulls out helpful debugging info for all shifts to pass to Honeycomb
function extractLargeShifts(entries) {
  let shifts = {};

  entries.forEach((shift, i) => {
    // Adjust the CLS Threshold for to include more events
    if (shift.value >= CLS_THRESHOLD) {
      let evt = {
        value: shift.value,
        hadRecentInput: shift.hadRecentInput,
        sources: []
      }
        
      // 'source' is the CWV identified culprit for a layout shift
      shift.sources.forEach((source, i) => { 
        const el = source.node;
        evt.sources.push({
          // This grabs all classes on the source element, to help identify the where on page it is
          sourceEl: el ? `${el.localName}.${[...el.classList].join('.')}` : null,
          // This grabs the classes on the source element's parent element
          parentEl: el ? `${el.parentElement.localName}.${[...el.parentElement.classList].join('.')}` : null,
          // This grabs the classes on the source element's previous sibling
          previousSiblingEl: el ? `${el.previousSibling.localName}.${[...el.previousSibling.classList].join('.')}`: null,
          // Initial height and width of the element that triggered a layout shift
          initialHeight: source.previousRect.height,
          initialWidth: source.previousRect.width,
          // End height and width of the element. This gives us the pixel value of layout shift size.
          endHeight: source.currentRect.height,
          endWidth: source.currentRect.width,
        });        
      });
      shifts[`shift_${i}`] = evt;
    }
  });
  return shifts;
}

// handler for Cumulative Layout Shift
function handleCLSEvent(evt) {
  let report = {
    span_event: evt.name,
    cls_delta: evt.delta,
    cls_value: evt.value,
    ...extractLargeShifts(evt.entries),
    ...metadata
  };

  send(report);
}

// ----------------------------------------------
// LARGEST CONTENTFUL PAINT (LCP) Observability
// ----------------------------------------------

// Handler for Largest Contentful Paint
function reportLCP(metric) {
  const report = {
    span_event: metric.name,
    lcp_value: metric.value,
    lcp_delta: metric.delta,
    ...metadata
  };

  // Google claims only the last element in the array is worth reporting
  const lcp = metric.entries.pop();

  // outputs element type and classlist as a string
  if (lcp.element) {
    report.elementSelector = `${lcp.element.localName}.${[...lcp.element.classList].join('.')}`;  
  }
  // Computed pixel size of the largest content
  report.sizeInPixels = lcp.size;
  // url if the largest content is media
  report.url = lcp.url;
  // time it took the browser to load the element
  report.loadTimeMS = lcp.loadTime

  send(report);
}


async function send(metric) {
  metric.span_id = generateId();
  metric.timestamp = Date.now();
  // first event should not have this field
  if (parentSpan) {
    metric.parent_id = parentSpan;
  }
  const response = await fetch(`${API_ENDPOINT}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(metric)
  });
  // fake daisy chaining
  parentSpan = metric.span_id;
}

export default function ({api}) {
  if (!api) return false;
  API_ENDPOINT = `${window.location.origin}${api}`;
  captureMetadata();
  getCLS(handleCLSEvent);
  getFID(reportScriptTiming);
  getLCP(reportLCP);
  getTTFB(reportScriptTiming);
};