const asyncHandler = require('../../middleware/handleAsync');
const Photo = require('../../models/Photo');

 /**
 * @route get /api/works/:workID/photos
 * @desc get photos
 * @access private
 */

exports.get = asyncHandler(async function(req, res) {    

  const photos = await Photo.find();  

    res.json({
      success: true,
      photos
    });


 });

 /**
 * @route GET /api/works/:workID/photos/:photoID
 * @desc get single work
 * @access private
 */

exports.detail = asyncHandler(async function(req, res) {  

  const photo = await Photo.findById(req.params.photoID);

  res.status(200)
  .json({
    success: true,
    msg: 'Single photo',
    photo
  });
  
});

