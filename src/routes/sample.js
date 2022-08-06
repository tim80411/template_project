const { Router } = require('express');

const router = Router();
const controller = require('src/controllers/sample');

// 路由
// GET
router.get('/count', controller.getCount);
router.get('/:recordId', controller.getOne);
router.get('/', controller.getList);

// POST
router.post('/', controller.createOne);

// PATCH
router.patch('/:recordId', controller.updateOne);

// DELETE
router.delete('/:recordId', controller.deleteOne);

module.exports = router;
