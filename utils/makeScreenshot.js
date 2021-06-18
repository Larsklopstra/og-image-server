const createPage = require('./createPage')

module.exports = async function makeScreenshot(request) {
    const { payload, signature } = request.query

    const decodedPayload = JSON.parse(decodeURIComponent(payload))

    const page = await createPage()

    await page.setViewport({ width: 1200, height: 630 })

    await page.goto(
        `${decodedPayload.url}?payload=${payload}&signature=${signature}`,
        {
            waitUntil: 'networkidle0',
        },
    )

    return await page.screenshot({ type: 'png' })
}
