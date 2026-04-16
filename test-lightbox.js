const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    // Log console messages
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('file:///home/bahl/Desktop/RahoolPortfolio.com/index.html');
    await page.waitForTimeout(2000);
    
    const isReady = await page.evaluate(() => typeof window.openLightbox === 'function');
    console.log('Is openLightbox defined:', isReady);
    
    console.log('Clicking cert...');
    await page.click('.cert-view');
    await page.waitForTimeout(1000);
    
    const lbState = await page.evaluate(() => {
        const lb = document.getElementById('lightbox');
        const img = document.getElementById('lightbox-img');
        return {
            classes: lb.className,
            display: window.getComputedStyle(lb).display,
            imgSrc: img.src
        };
    });
    
    console.log('Lightbox state:', lbState);
    
    await browser.close();
})();
