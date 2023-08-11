const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
<<<<<<< HEAD
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://warendy.shop/:path*", // 원격 서버의 주소로 변경
      },
    ];
  },
  // Link 컴포넌트의 anchor 속성 사용
  experimental: {
    // 이 부분을 추가합니다
    externalDir: true,
=======
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
>>>>>>> kakaoMap
  },
};
