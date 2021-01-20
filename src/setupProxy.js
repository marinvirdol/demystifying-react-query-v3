const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      pathRewrite: {
        '^/api/movies': '/movies',
      },
      target: 'http://localhost:3000',
      changeOrigin: true,
      logLevel: 'debug',
    }),
  )
}
