const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  images: {
    domains: ["images.vivino.com"], // 이미지 호스트 이름 추가
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://warendy.shop/:path*", // 원격 서버의 주소로 변경
      },
    ];
  },
};
