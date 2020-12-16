const express = require('express');
const router = express.Router();
const Work = require('../../models/Work');
const Photo = require('../../models/Photo');

const works_controller = require('../../controllers/api/worksControllers');
const handleQuery = require('../../middleware/handleQuery');
const { removeCloud } = require('../../middleware/handlePhotos/handleCloud');

// Resources
const photosRouter = require('./photosRoutes');

router.use('/:workID/photos', photosRouter);

router
  .route('/')
  .get(handleQuery(Work), works_controller.get)
  .post(works_controller.create);

router
  .route('/:workID')
  .get(works_controller.detail)
  .put(works_controller.update)
  .delete(removeCloud(Photo), works_controller.delete);

module.exports = router;