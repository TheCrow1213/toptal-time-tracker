'use strict'

const Env = use('Env')
const Youch = use('youch')
const Http = exports = module.exports = {}

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function * (error, request, response) {
  const status = error.status || 500

  /**
   * DEVELOPMENT REPORTER
   */
  if (Env.get('NODE_ENV') === 'development') {
    const youch = new Youch(error, request.request)
    const type = request.accepts('json', 'html')
    const formatMethod = type === 'json' ? 'toJSON' : 'toHTML'
    const formattedErrors = yield youch[formatMethod]()
    response.status(status).send(formattedErrors)
    return
  }

  /**
   * PRODUCTION REPORTER
   */
  console.error(error.stack)
  yield response.status(status).sendView('errors/index', {error})
}

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {

  // Custom time validator
  const Validator = use('Adonis/Addons/Validator')
  Validator.extend('timeentry', (data, field, message, args, get) => {

    return new Promise((resolve, reject) => {
      const fieldValue = get(data, field)
      if (fieldValue.match(/([0-9]{0,2}:){3}[0-9]+/)) {
        resolve('Allowed')
        return
      }
      reject(message)
    })

  }, 'Invalid time format')

  // Additional onstart methods
}
