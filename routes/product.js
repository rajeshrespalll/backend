const express = require('express');
const router = express.Router();
const { create, list, read } = require('../controllers/product');

router.post('/product', create);
router.get('/products', list);
router.get('/product/:slug', read);

module.exports = router;