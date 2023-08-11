const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
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
  },
  env: {
    KAKAO_MAP_KEY: "99d585418706339ae15d964c524e4848",
    API_KEY: "https://warendy.shop/",
  },
};
