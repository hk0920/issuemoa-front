const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/voca-api", {
      target: "http://61.102.114.235:17080",
      changeOrigin: true,
      pathRewrite: {
        '^/voca-api': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/users-api", {
      target: "http://61.102.114.235:17070",
      changeOrigin: true,
      pathRewrite: {
        '^/users-api': "",
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
};