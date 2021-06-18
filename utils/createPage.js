const chrome = require('chrome-aws-lambda')
const core = require('puppeteer-core')

module.exports = async function createPage() {
    const browser = await core.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    })

    return await browser.newPage()
}
