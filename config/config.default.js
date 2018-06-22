module.exports = {
  db: {
    host: '106.15.230.136',
    user: 'super',
    password: 'zhazhahui',
    database: 'supermall'
  },
  redis: {
    host: '106.15.230.136',
    port: 6379,
    password: 'alfieri'
  },
  lastSecret: 'a093d64d01',
  firstSecret: 'e069e5c994',
  port: process.env.PORT || 3000
}
