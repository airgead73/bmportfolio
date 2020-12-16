const multer = require('multer');
const path = require('path');
const Work = require('../../models/Work');


const uploadImage = async function(req, res, next) {

  const checkFileType = function(req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
      return cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Wrong file type'));
    }

  }

  const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, 'temp')
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: checkFileType
  }).single('new_image');

  upload(req, res, (err) => {

    if(err) {
      console.log(err.message)
   } else if (req.file == undefined) {
      console.log('No file uploaded');
    } else {
      res.uploadData = req.file;
    }

    next();

  });  

}

module.exports = uploadImage;
