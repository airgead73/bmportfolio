const asynchHandler = require('../../middleware/handleAsync');
const Work = require('../../models/Work');

/**
 * @route GET /api/search/:searchTerm
 * @desc get list of works 
 * @access private
 */