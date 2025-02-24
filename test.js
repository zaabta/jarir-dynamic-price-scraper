const puppeteer = require('puppeteer')

;(async () => {
  try {
    const browser = await puppeteer.launch({
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: false, // Run with UI to debug issues
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()
    await page.goto('https://www.google.com/', { waitUntil: 'networkidle2' })

    console.log('Page title:', await page.title())
    await browser.close()
  } catch (error) {
    console.error('Error:', error)
  }
})()
