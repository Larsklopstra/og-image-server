const crypto = require('crypto')

module.exports = async function authorizeRequest(request) {
    const { payload, signature } = request.query

    const computedSignature = crypto
        .createHmac('sha256', process.env.SECRET_TOKEN)
        .update(payload)
        .digest('hex')

    return computedSignature === signature
}
