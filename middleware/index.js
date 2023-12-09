const errorHandlingMiddlerware = require('./errorHandlingMiddleware');
const { callbackRequestValidator } = require('./validators');

module.exports = {
  errorHandlingMiddleware: errorHandlingMiddlerware,
  callbackRequestValidator: callbackRequestValidator
}