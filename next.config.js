const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  async rewrites() {
    return [
      {
        source: "/signin",
        destination: "https://warendy.shop/:path*", // 원격 서버의 주소로 변경
      },
    ];
  },
};
