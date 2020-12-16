const compileData = async function(req, res, next) {

  const photoData = {...req.body};
  const { originalname } = res.uploadData;
  const { public_id, width, height, format, bytes, secure_url } = res.cloudData;
  const url_copyright = res.cloudData.eager[1].secure_url;
  const url_thumbnail = res.cloudData.eager[0].secure_url;

  photoData.work = req.params.workID;
  photoData.public_id = public_id;
  photoData.original_file = originalname;
  photoData.width = width;
  photoData.height = height;
  photoData.format = format;
  photoData.size = bytes;
  photoData.url_raw = secure_url;
  photoData.url_copyright = url_copyright;
  photoData.url_thumbnail = url_thumbnail;

  res.photoData = photoData;

  next();

}

module.exports = compileData;



