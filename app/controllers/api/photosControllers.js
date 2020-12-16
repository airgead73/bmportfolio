const asyncHandler = require('../../middleware/handleAsync');
const Photo = require('../../models/Photo');
const { cloudinary } = require('../../config/cloudinary');

/**
 * @route POST /api/photos
 * @desc create photos
 * @access private
 */

 exports.create = asyncHandler(async function(req, res) {  

  const photo = new Photo(res.photoData);

  console.log(res.photoData);

  await photo.save();  

    res.json({
      success: true,
      photo
    });


 });

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
 * @route GET /api/works/:workID
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

/**
 * @route PUT /api/photos/:photoID
 * @desc update 
 * @access private
 */

exports.update = asyncHandler(async function(req, res) {  

  // find photo
  let photo = await Photo.findById(req.params.photoID);

  if(!photo) {
    return res
      .status(404)
      .json({
        success: false,
        errors: [
          {
            msg: 'photo not found.'
          }
        ]
      })
  }

  // build fields
  const {
    title,
    work,
    original_file,
    width,
    height,
    format,
    size,
    url_raw,
    url_copyright,
    url_thumbnail
  } = req.body;

  const photoFields = {};
  if(title) photoFields.title = title;
  if(work) photoFields.work = work;
  if(original_file) photoFields.original_file = original_file;
  if(width) photoFields.width = width;
  if(height) photoFields.height = height;
  if(format) photoFields.format = format;
  if(size) photoFields.size = size;
  if(url_raw) photoFields.url_raw = url_raw;
  if(url_copyright) photoFields.url_copyright = url_copyright;
  if(url_thumbnail) photoFields.url_thumbnail = url_thumbnail;

  // update photo

  photo = await Photo.findByIdAndUpdate(req.params.photoID, { $set: photoFields}, { new: true })

  res
    .status(200)
    .json({
      success: true,
      msg: 'photo updated.',
      photo
    });

});

/**
 * @route DELETE /api/photos/:photoID
 * @desc delete photo
 * @access private
 */

exports.delete = asyncHandler(async function(req, res) {  

  // find photo
  let photo = await Photo.findById(req.params.photoID);

  if(!photo) {
    return res
      .status(404)
      .json({
        success: false,
        errors: [
          {
            msg: 'photo not found.'
          }
        ]
      })
  }  

  // delete photo

  await photo.remove();

  res
    .status(200)
    .json({
      success: true,
      msg: `${photo.title} deleted.`
    })

});