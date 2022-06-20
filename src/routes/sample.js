const router = require('express').Router();

// 路由
router.get('/', (req, res) => res.ok('deploy by github action ok啦'));

module.exports = router;
