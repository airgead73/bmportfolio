const express = require('express');
const router = express.Router();
const Work = require('../../models/Work');

const works_controller = require('../../controllers/api/worksControllers');
const handleQuery = require('../../middleware/handleQuery');

router.use('/:workID/photos', photosRouter);

router.route('/').get(handleQuery(Work), works_controller.get);

router.route('/:workID').get(works_controller.detail);

module.exports = router;