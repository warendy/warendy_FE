const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  images: {
    domains: ["images.vivino.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://warendy.shop/api/:path*",
      },
    ];
  },
  env: {
    KAKAO_MAP_KEY: "99d585418706339ae15d964c524e4848",
    API_KEY: "https://warendy.shop/",
  },
};
