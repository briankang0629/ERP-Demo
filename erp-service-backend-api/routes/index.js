const express = require('express');
const router = express.Router();

// Register Controller
const ShippingController = require('../controller/ShippingController');

// Shipping Routes
router.get('/shipping', ShippingController.index);
router.get('/shipping/:id', ShippingController.info);
router.post('/shipping/:id?', ShippingController.save);

module.exports = router;