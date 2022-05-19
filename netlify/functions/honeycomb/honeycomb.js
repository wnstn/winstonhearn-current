const Libhoney = require('libhoney');
const allowedList = ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'root'];

const handler = async function (req) {
  const metric  = JSON.parse(req.body);

  try {
    if (!allowedList.includes(metric.span_event)) {
      return false;
    }

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
    console.log(`sending ${metric.trace_id}`)
    hny.sendNow(metric);
    
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
