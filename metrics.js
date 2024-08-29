const app = require('./app');
const client = require('prom-client');


// Create a Registry to register the metrics
const register = new client.Registry();

// Create a custom metric
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'path', 'status_code']
});

// Register the histogram
register.registerMetric(httpRequestDuration);

// Middleware to collect metrics
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    end({ method: req.method, path: req.path, status_code: res.statusCode });
  });
  next();
});

// Expose the metrics at the /metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
