const express = require('express');
const router = express.Router();
const Work = require('../../models/Work');

const index_controller = require('../../controllers/client/indexControllers');
const handleQuery = require('../../middleware/handleQuery');

router
  .route('/')
  .get(
    index_controller.landing
  );

router
  .route('/works')
  .get(
    handleQuery(Work),
    index_controller.dashboard
  );  

router
  .route('/bio')
  .get(
    index_controller.bio
  );  

router
  .route('/signin')
  .get(
    index_controller.signin
  ); 
  
module.exports = router;  