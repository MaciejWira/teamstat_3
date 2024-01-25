const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `@import "helpers/_all.scss";`,
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: `/table/${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
