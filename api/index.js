const authorizeRequest = require('../utils/authorizeRequest')
const makeScreenshot = require('../utils/makeScreenshot')

module.exports = async (request, response) => {
    try {
        const authorized = await authorizeRequest(request)

        if (!authorized) {
            return response
                .status(400)
                .setHeader('Content-Type', 'text/html')
                .send('<h1>Invalid signature</h1>')
        }

        const screenshot = await makeScreenshot(request)

        return response
            .status(200)
            .setHeader('Content-Type', 'image/png')
            .setHeader(
                'Cache-Control',
                `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
            )
            .send(screenshot)
    } catch (error) {
        console.log(error)

        return response
            .status(500)
            .setHeader('Content-Type', 'text/html')
            .send('<h1>Internal error</h1>')
    }
}
