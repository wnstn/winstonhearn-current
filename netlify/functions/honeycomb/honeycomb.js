const fetch = require('node-fetch')
import Libhoney from 'libhoney';

const hny = new Libhoney({
  apiHost: 'https://api.honeycomb.io',
  writeKey: $HNY_API_KEY,
  dataset: $HNY_DATASET,
});

function sendEvent(metric) {
  const evnt = hny.newEvent();
  evnt.add(metric);
  evnt.send();
}

const handler = async function (req) {
  const { metric } = req.body;
  const allowedList = ['FCP', 'LCP', 'CLS', 'FID', 'TTFB'];

  try {
    if (allowedList.includes(metric.name)) {
      sendEvent(metric);
    }

    return {
      statusCode: 200
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
