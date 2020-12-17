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
 * @route   GET /about
 * @desc    view about page
 * @access  private
 */

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



