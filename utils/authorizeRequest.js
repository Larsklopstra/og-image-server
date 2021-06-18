const crypto = require('crypto')

module.exports = async function authorizeRequest(request) {
    const { signature, payload } = request.query

    const decodedPayload = decodeURIComponent(payload)

    const computedSignature = crypto
        .createHmac('sha256', process.env.SECRET_TOKEN)
        .update(decodedPayload)
        .digest('hex')

    return computedSignature === signature
}
