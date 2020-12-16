const express = require('express');
const router = express.Router();

const index_controller = require('../../controllers/client/indexControllers');

router
  .route('/')
  .get(
    index_controller.landing
  );


  
module.exports = router;  