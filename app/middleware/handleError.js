const { ISDEV } = require('../config/config');

const handleError = async function(err, req, res, next) {

  const json = res.locals.res_json;
  const html = res.locals.res_html;

  if(ISDEV) {
    console.log('****************************');
    console.error({
      name: err.name,
      status: err.status,
      msg: err.message
    });
    console.log('****************************');
  }  

  if(html) {
    switch(err.name) {
      case 'NotFoundError':
        return res
          .status(404)
          .json({
            status: err.status,
            msg: err.message
          });
        break;
      case 'ReferenceError':
        return res
          .status(500)
          .json({
            status: err.status,
            msg: err.message
          });
        break; 
      case 'CastError':  
        return res
          .status(404) 
          .json({
            status: 404,
            msg: err.message
          });
          break;
      default:     
        return res
          .status(500) 
          .json({
            status: 500,
            msg: err.message
          }); 
    } 
  }

  if(json) {
    jsonReply(err);
  }

  if(html) {
    htmlReply(err);
  }

  function jsonReply(err) {
    switch(err.name) {
      case 'NotFoundError':
        return res
          .status(404)
          .json({
            status: err.status,
            msg: err.message
          });
        break;
      case 'ReferenceError':
        return res
          .status(500)
          .json({
            status: err.status,
            msg: err.message
          });
        break; 
      case 'CastError':  
        return res
          .status(404) 
          .json({
            status: 404,
            msg: err.message
          });
          break;
      default:     
        return res
          .status(500) 
          .json({
            status: 500,
            msg: err.message
          }); 
    } 
  }

  function htmlReply(err) {
    switch(err.name) {
      case 'NotFoundError':
        return res
          .status(404)
          .json({
            status: err.status,
            msg: err.message
          });
        break;
      case 'ReferenceError':
        return res
          .status(500)
          .json({
            status: err.status,
            msg: err.message
          });
        break; 
      case 'CastError':  
        return res
          .status(404) 
          .json({
            status: 404,
            msg: err.message
          });
          break;
      default:     
        return res
          .status(500) 
          .json({
            status: 500,
            msg: err.message
          }); 
    } 
  }



 

}

module.exports = handleError;