const puppeteer = require('puppeteer')

async function scrapeProducts(searchQuery) {
  const browser = await puppeteer.launch({
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  const searchUrl = `https://www.jarir.com/catalogsearch/result?search=${encodeURIComponent(
    searchQuery,
  )}`

  await page.goto(searchUrl, { waitUntil: 'domcontentloaded' })

  let products = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.product-tile__item')).map(
      (product) => ({
        title:
          product.querySelector('.product-title__title')?.textContent.trim() ||
          'N/A',
        price: product.querySelector('.price')?.textContent.trim() || 'N/A',
        link: product.querySelector('a')?.href.trim() || 'N/A',
      }),
    )
  })

  await browser.close()

  if (products.length === 0) {
    console.log(`No results found for "${searchQuery}".`)
    return null
  }

  products = products
    .map((p) => ({
      ...p,
      price: parseFloat(p.price.replace(/[^\d.]/g, '')),
    }))
    .filter((p) => !isNaN(p.price))

  if (products.length === 0) {
    console.log(`No valid prices found for "${searchQuery}".`)
    return null
  }

  const queryWords = searchQuery.toLowerCase().split(' ')
  products = products.filter((p) =>
    queryWords.some((word) => p.title.toLowerCase().includes(word)),
  )

  if (products.length === 0) {
    console.log(`No relevant results found for "${searchQuery}".`)
    return null
  }

  // **2️⃣ Remove outliers using Median Absolute Deviation (MAD)**
  const prices = products.map((p) => p.price)

  function getMedian(arr) {
    const sorted = [...arr].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid]
  }

  const median = getMedian(prices)
  const deviations = prices.map((p) => Math.abs(p - median))
  const mad = getMedian(deviations)
  const threshold = median + 2 * mad

  products = products.filter((p) => p.price <= threshold) // Keep only reasonable prices

  if (products.length === 0) {
    console.log(`No reasonable prices found for "${searchQuery}".`)
    return null
  }

  // **3️⃣ Get the best reasonable price**
  const bestDeal = products.reduce(
    (min, p) => (p.price < min.price ? p : min),
    products[0],
  )

  console.log(`✅ Best price for "${searchQuery}":`, bestDeal)
  return bestDeal
}
const searchQuery = 'iphone 15 pro'
scrapeProducts(searchQuery).catch(console.error)
