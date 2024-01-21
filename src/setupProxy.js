const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/board-api", {
      target: "http://61.102.114.235:8000",
      changeOrigin: true,
      pathRewrite: {
        '^/board-api': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/users-api", {
      target: "http://61.102.114.235:8000",
      changeOrigin: true,
      pathRewrite: {
        '^/users-api': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/voca-api", {
      target: "http://61.102.114.235:8000",
      changeOrigin: true,
      pathRewrite: {
        '^/voca-api': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/interview-api", {
      target: "http://61.102.114.235:8000",
      changeOrigin: true,
      pathRewrite: {
        '^/interview-api': "",
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