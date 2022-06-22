const router = require('express').Router();

// 路由
// GET
router.get('/', (req, res) => res.ok('deploy by github action ok啦'));

// POST
router.post('/files', (req, res) => res.ok('upload file done'));

module.exports = router;
