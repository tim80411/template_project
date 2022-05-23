const router = require('express').Router();
const sample = require('./sample');

// 路由
router.use('/sample', sample);

module.exports = router;
