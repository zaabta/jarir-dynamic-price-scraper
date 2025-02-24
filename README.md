# **Dynamic Product Price Scraper**

A dynamic web scraper for extracting the best reasonable price of a product from **Jarir Bookstore** using **Puppeteer**. The scraper intelligently filters out irrelevant results and identifies the best price by handling search queries efficiently and removing outliers.

---

## **⚡ Features**

- **Dynamic Search**: Supports any product search query (e.g., "PlayStation 5", "iPhone 15", etc.).
- **Relevant Results**: Filters out irrelevant products based on the search query.
- **Reasonable Pricing**: Uses statistical techniques (Median Absolute Deviation) to filter out unrealistic prices.
- **Optimized**: Efficient and faster scraping with error handling.

---

## **🚀 Prerequisites**

- **Node.js** (v18 or higher)
- **npm** (or **yarn**)
- **Google Chrome** installed (or a compatible Chromium version)

---

## **📦 Installation**

1. Clone the repository:
    ```bash
    git clone https://github.com/zaabta/jarir-dynamic-price-scraper.git
    cd jarir-dynamic-price-scraper.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. (Optional) Make sure **Google Chrome** is installed on your machine.

---

## **📜 Usage**

1. **Dynamic Query**: Set the `searchQuery` variable in the `scraper.js` file to any product name you want to scrape (e.g., "PlayStation 5", "iPhone", "MacBook").
   
    Example of changing the search query:
    ```javascript
    const searchQuery = 'PlayStation 5';  // Change this value to search for other products
    ```

2. Run the scraper:
    ```bash
    node scraper.js
    ```

3. The scraper will extract the relevant product details (title, price, and link) and dynamically return the **best reasonable price** for the product.

---

## **🧠 How It Works**

- **Step 1**: The scraper navigates to the **Jarir** search page for the specified product.
- **Step 2**: Extracts product titles, prices, and links from the search results.
- **Step 3**: Filters products based on **query relevance** (checks if the product title contains words from the search query).
- **Step 4**: Converts prices to numbers and filters out unrealistic values using **Median Absolute Deviation** (MAD).
- **Step 5**: Returns the **best price** from reasonable results.

---

## **🛠️ Dependencies**

- `puppeteer`: A headless browser automation library for web scraping.
- `node-fetch`: (optional) A module for HTTP requests.

---

## **💡 Customize**

You can adjust the **search query** in the `scraper.js` file, and modify the code to:
- Change how outliers are handled.
- Adjust the filtering logic for different websites or products.
- Add other features (e.g., price comparison with multiple websites).

---

## **🔧 Troubleshooting**

- **Issue**: "No relevant results found."
    - **Solution**: Double-check your query. Make sure it's specific enough for the search results to match.

- **Issue**: Puppeteer is not opening correctly.
    - **Solution**: Ensure you have the latest **Google Chrome** or a compatible **Chromium** installed.

---

## **🌍 License**

This project is licensed under the MIT License.

---

## **💻 Example Code**

```javascript
const searchQuery = 'PlayStation 5'; // Change this value to search for other products
// Call function dynamically
scrapeProducts(searchQuery).catch(console.error);
```
