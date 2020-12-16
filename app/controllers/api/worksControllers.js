const asyncHandler = require('../../middleware/handleAsync');
const Work = require('../../models/Work');

/**
 * @route GET /api/works
 * @desc get all works
 * @access private
 */

exports.get = asyncHandler(async function(req, res) {  

  const results = res.results;

  res
    .status(200)
    .json({
      success: true,
      msg: 'List of works.',
      item_count: results.length,
      works: results
      
    });
  
});

/**
 * @route GET /api/works/:workID
 * @desc get single work
 * @access private
 */

exports.detail = asyncHandler(async function(req, res) {  

  const work = await Work.findById(req.params.workID);

  res.status(200)
  .json({
    success: true,
    msg: 'Single work',
    work
  });
  
});

