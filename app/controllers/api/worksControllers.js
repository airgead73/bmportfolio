const asyncHandler = require('../../middleware/handleAsync');
const Work = require('../../models/Work');

/**
 * @route POST /api/works
 * @desc create work
 * @access private
 */

exports.create = asyncHandler(async function(req, res) {  

  const work = new Work(req.body);

  await work.save();

  res
    .status(200)
    .json({ 
      success: true,
      message: `${work.title} successfully added!`
     });

});

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

/**
 * @route PUT /api/works/:workID
 * @desc update 
 * @access private
 */

exports.update = asyncHandler(async function(req, res) {  

  // find work
  let work = await Work.findById(req.params.workID);

  if(!work) {
    return res
      .status(404)
      .json({
        success: false,
        errors: [
          {
            msg: 'Work not found.'
          }
        ]
      })
  }

  // build fields
  const {
    title,
    mode,
    category,
    material
  } = req.body;

  const workFields = {};
  if(title) workFields.title = title;
  if(mode) workFields.mode = mode;
  if(category) workFields.category = category;
  if(material) workFields.material = material;

  // update work

  work = await Work.findByIdAndUpdate(req.params.workID, { $set: workFields}, { new: true })

  res
    .status(200)
    .json({
      success: true,
      msg: 'Work updated.',
      work
    });

});

/**
 * @route DELETE /api/works/:workID
 * @desc delete work
 * @access private
 */

exports.delete = asyncHandler(async function(req, res) {  

  // find work
  let work = await Work.findById(req.params.workID);

  if(!work) {
    return res
      .status(404)
      .json({
        success: false,
        errors: [
          {
            msg: 'Work not found.'
          }
        ]
      })
  }  

  // delete work
  
  await work.remove();

  res
    .status(200)
    .json({
      success: true,
      msg: 'Work is deleted.'
    })

});

