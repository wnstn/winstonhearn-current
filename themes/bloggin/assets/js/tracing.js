import * as params from '@params';
import { HoneycombWebSDK } from '@honeycombio/opentelemetry-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';

const configDefaults = {
  // propagateTraceHeaderCorsUrls: [
  // /.+/g, // Regex to match your backend URLs. Update to the domains you wish to include.
  // ]
}

const sdk = new HoneycombWebSDK({
  apiKey: params.env.hny, // netlify admin
  serviceName: params.env.service, // netlify admin
  instrumentations: [getWebAutoInstrumentations({
    // Loads custom configuration for xml-http-request instrumentation.
    '@opentelemetry/instrumentation-xml-http-request': configDefaults,
    '@opentelemetry/instrumentation-fetch': configDefaults,
    '@opentelemetry/instrumentation-document-load': configDefaults,
  })],
});
sdk.start();
