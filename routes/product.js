const express = require('express');
const { getProduct, createProduct, updateProduct, deleteProduct } = require('../controller/product');
const router = express.Router();


router.post('/create', createProduct);
router.get('/getproduct', getProduct);
router.put('/updateproduct/:id', updateProduct);
router.delete('/deleteproduct/:id', deleteProduct);
module.exports = router;