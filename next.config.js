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
};
