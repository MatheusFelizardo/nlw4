const path = require('path')
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})
