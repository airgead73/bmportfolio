const asyncHandler = require('../../middleware/handleAsync');

/**
 * @route   GET /
 * @desc    view landing page
 * @access  private
 */

exports.landing = asyncHandler(async function(req, res, next) {

  return res
    .status(200)
    .render('pages/index', {
      success: true,
      title: 'portfolio'
    });

});

/**
 * @route   GET /works
 * @desc    view works page
 * @access  private
 */

exports.works = asyncHandler(async function(req, res, next) {   

  return res
    .status(200)
    .render('pages/works', {
      success: true,
      title: 'works'
    });

});

/**
 * @route   GET /:page
 * @desc    view pages
 * @access  private
 */

exports.pages = asyncHandler(async function(req, res, next) {

  const { page } = req.params;

  return res
    .status(200)
    .render('pages/index', {
      success: true,
      title: page
    });

});

/**
 * @route   GET /signin
 * @desc    view signin page
 * @access  private
 */



/**
 * @route   GET /works
 * @desc    view works page
 * @access  private
 */

/**
 * @route   GET /contacts
 * @desc    view contacts page
 * @access  private
 */ 

/**
 * @route   GET /terms
 * @desc    view terms page
 * @access  private
 */ 



