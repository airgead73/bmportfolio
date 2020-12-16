const express = require('express');
const router = express.Router({ mergeParams: true });

const photos_controller = require('../../controllers/api/photosControllers');

router.route('/').get(photos_controller.get);  

router.route('/:photoID').get(photos_controller.detail);

module.exports = router;