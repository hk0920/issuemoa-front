const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/voca-api", {
      target: "http://localhost:17080",
      changeOrigin: true,
      pathRewrite: {
        '^/voca-api': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/googleapisYoutube", {
      target: "https://www.googleapis.com/youtube/v3/videos",
      changeOrigin: true,
      pathRewrite: {
        '^/googleapisYoutube': "",
      }
    })
  );
};