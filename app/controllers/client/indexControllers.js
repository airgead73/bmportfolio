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
      title: 'bmadmin',
      titleStem: this.title,
      script_work: true
    });

});

/**
 * @route   GET /works
 * @desc    view dashboard page
 * @access  private
 */
exports.dashboard = asyncHandler(async function(req, res, next) {

  const { count, data } = res.results;
  const { mode } = req.query;
  const titleStem = mode || 'works';

  return res
    .status(200)
    .render('pages/works/index', {
      success: true,
      title: `bmadmin | ${titleStem}`,
      titleStem: titleStem,
      script_work: true,
      count: count,
      works: data
    });

});

/**
 * @route   GET /
 * @desc    view signin
 * @access  private
 */
exports.signin = asyncHandler(async function(req, res, next) {
  return res
    .status(200)
    .render('pages/signin', {
      success: true,
      title: 'bdamdin | signin',
      titleStem: 'signin'
    });

});

/**
 * @route   GET /
 * @desc    view signin
 * @access  private
 */
exports.bio = asyncHandler(async function(req, res, next) {
  return res
    .status(200)
    .render('pages/bio', {
      success: true,
      title: 'bdamdin | bio',
      titleStem: 'bio'
    });

});