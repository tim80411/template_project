const router = require('express').Router();
const sample = require('./sample');

// 路由
router.use('/samples', sample);

module.exports = router;
