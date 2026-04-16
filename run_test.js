const puppeteer = require('puppeteer');
(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        page.on('console', msg => console.log('LOG:', msg.text()));
        page.on('pageerror', err => console.log('ERR:', err.message));
        await page.goto('file:///home/bahl/Desktop/RahoolPortfolio.com/index.html');
        await page.waitForTimeout(2000);
        console.log("Checking openLightbox...");
        const isDef = await page.evaluate(() => typeof window.openLightbox);
        console.log("openLightbox is:", isDef);
        await browser.close();
    } catch(e) {
        console.log("fatal:", e);
    }
})();
