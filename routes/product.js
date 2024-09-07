const express = require('express');
const router = express.Router();
const { create, list, read, update, remove} = require('../controllers/product');

router.post('/product', create);
router.get('/products', list);
router.get('/product/:slug', read);
router.put('/product/:slug', update);
router.delete('/product/:slug', remove);

module.exports = router;