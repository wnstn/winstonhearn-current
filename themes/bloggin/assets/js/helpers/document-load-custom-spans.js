export const DocumentLoadSpans = (span) => {
  try {
    if (!!window.location.search) {
      span.setAttribute('url_params', window.location.search);
      const urlParams = new URLSearchParams(window.location.search)
      const params = Object.fromEntries(urlParams);

      for (const param in params) {
        if (params.hasOwnProperty(param)) {
          span.setAttribute(`param.${param}`, params[param]);
        }
      }
    }
  } catch(e) {
    console.log(e);
    span.recordException(e)
  }

  span.setAttributes({
    'document.title':document.title,
    'document.is_secure': window.isSecureContext,
    'document.uri': document.URL,
    'document.script_count': document.scripts.length,
    'document.stylesheet.count': document.styleSheets,
    'document.visibility': document.visibilityState,
    'referer': document.referer,
  });
};

export const ResourceFetchSpans = (span, resource) => {
  if (!resource) { return; }

  span.setAttributes({
    'resource.initiator': resource.initiatorType,
    'resource.compressed': resource.decodedBodySize !== resource.encodedBodySize,
    'resource.tcp.duration_ms': resource.connectEnd - resource.connectStart,
    'resource.dns.duration_ms': resource.domainLookupEnd - resource.domainLookupStart,
    'resource.tls_handshake.duration_ms': resource.requestStart - resource.secureConnectionStart,
    'resource.request.duration_ms': resource.responseStart - resource.requestStart,
    'resource.transferred': resource.transferSize,
  });
}