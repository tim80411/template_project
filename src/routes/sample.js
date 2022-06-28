const router = require('express').Router();
const controller = require('src/controllers/sample');

// 路由
// GET
router.get('/', controller.getList);
router.get('/count', controller.getCount);
router.get('/:recordId', controller.getOne);

// POST
router.post('/', controller.createOne);

// PUT
router.patch('/:recordId', controller.updateOne);

// DELETE
router.delete('/:recordId', controller.deleteOne);

module.exports = router;
