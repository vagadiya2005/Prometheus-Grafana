const express = require('express');
const client = require('prom-client');

const app = express();
const register = new client.Registry();

// Create a Counter metric for counting hits on each endpoint
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'endpoint', 'status_code'],
});
      
// Register the counter metric
register.registerMetric(httpRequestCounter);

// Default metrics (like CPU, memory) from prom-client
client.collectDefaultMetrics({ register });

// Middleware to count requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      endpoint: req.path,
      status_code: res.statusCode,
    });
  });
  next();
});

// Define your API endpoints
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/other', (req, res) => {
  res.send('Other Page');
});


// Expose the metrics endpoint for Prometheus scraping
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
