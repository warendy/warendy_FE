const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  // next.config.js

  async rewrites() {
    return [
      {
        source: "/api/:path*", // 이 부분에는 프록시하고자 하는 경로를 지정합니다
        destination: "https://warendy.shop/:path*", // 실제 API 서버의 URL을 여기에 적습니다.
      },
    ];
  },
  env: {
    KAKAO_MAP_KEY: "99d585418706339ae15d964c524e4848",
    API_KEY: "https://warendy.shop/",
  },
};
