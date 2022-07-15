const router = require('express').Router();

// #route required#
const sample = require('./sample');

// #route import# 路由
router.use('/samples', sample);

module.exports = router;
