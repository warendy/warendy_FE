/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    domains: ["images.vivino.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://warendy.shop/api/:path*", // 원격 서버의 주소로 변경
      },
    ];
  },
};

