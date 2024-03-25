const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/backend", {
      target: "http://gate.issuemoa.kr:8000",
      changeOrigin: true,
      pathRewrite: {
        '^/backend': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/kakao", {
      target: "https://kauth.kakao.com",
      changeOrigin: true,
      pathRewrite: {
        '^/kakao': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/kapi", {
      target: "https://kapi.kakao.com",
      changeOrigin: true,
      pathRewrite: {
        '^/kapi': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/weather-api", {
      target: "https://api.openweathermap.org/data/2.5/",
      changeOrigin: true,
      pathRewrite: {
        '^/weather-api': "",
      }
    })
  );
};