const express = require('express');
const router = express.Router({ mergeParams: true });

const photos_controller = require('../../controllers/api/photosControllers');
const handleUpload = require('../../middleware/handlePhotos/handleUpload');
const { uploadCloud } = require('../../middleware/handlePhotos/handleCloud');
const handleData = require('../../middleware/handlePhotos/handleData');

router
  .route('/')
  .get(photos_controller.get)
  .post(
    handleUpload, 
    uploadCloud, 
    handleData,
    photos_controller.create
  );  

router
  .route('/:photoID')
  .get(photos_controller.detail)
  .put(photos_controller.update)
  .delete(photos_controller.delete);

module.exports = router;