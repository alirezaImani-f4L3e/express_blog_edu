const gravatar = require('gravatar')

exports.gravatar = (email, options = null) => {
    return gravatar.url(email, options)
}