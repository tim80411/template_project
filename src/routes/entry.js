// middleware 不同層的error handling需要各自處理
// #route required#
const sample = require('./sample');

function initRoute(app) {
  // #route import# 路由
  app.use('/samples', sample);
}

module.exports = initRoute;
