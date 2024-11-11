const PromSystemMetrics = require('@nielsen-media/prom-system-metrics').PromMetrics
const promSystemMetrics = new PromSystemMetrics()

const prometheus = function (options) {
  const { metricsUrl, excludedUrls, enableDurationHistogram, enableDurationSummary, listOfDefaultMetricsToRemove = [] } = options
  const excludedRoutes = excludedUrls
  return promSystemMetrics.initMetricsMiddleware({
    metricsUrl: metricsUrl,
    excludeRoutes: excludedRoutes,
    enableDurationHistogram,
    enableDurationSummary,
    listOfDefaultMetricsToRemove
  })
}
module.exports = {
  prometheus
}
