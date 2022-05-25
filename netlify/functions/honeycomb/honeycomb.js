const Libhoney = require('libhoney');
const allowedList = ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'root'];

const hny = new Libhoney({
  apiHost: 'https://api.honeycomb.io',
  writeKey: process.env.HNY_API_KEY,
  dataset: process.env.HNY_DATASET,
  responseCallback: responses => {
    responses.forEach(resp => {
      console.log(resp);
    });
  },
});

const handler = async function (req) {
  const metric  = JSON.parse(req.body);

  try {
    if (!allowedList.includes(metric.span_event)) {
      return false;
    }
 
    let ev = hny.newEvent();
    ev.add(metric);
    ev.metadata = { trace: metric.trace_id, span: metric.span_id };
    ev.send();
    hny.flush();
    
    return {
      statusCode: 200
    }
  } catch (error) {
    // output to netlify function log
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
