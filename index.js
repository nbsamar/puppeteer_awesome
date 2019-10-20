const puppeteer = require('puppeteer');

// 1. Opening chrome and a url
puppeteer.launch({headless: false}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({width: 1280, height: 800})
    await page.goto('https://www.aymen-loukil.com');
    await browser.close();
});


// 2. Screenshot
puppeteer.launch({headless: false}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({width: 1280, height: 800})
    await page.goto('https://www.aymen-loukil.com');
    await page.screenshot({path: 'myscreenshot.png', fullPage: true});
    await browser.close();
});


// 3. Specific region as screenchot
const options = {
    path: 'amazon-header.png',
    fullPage: false,
    clip: {
        x: 0,
        y: 0,
        width: 1280,
        height: 150
    }
}

puppeteer.launch({headless: false}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({width: 1280, height: 800})
    await page.goto('https://www.amazon.com');
    await page.screenshot(options);
    await browser.close();
});


// 4. Mock a mobile device
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];
puppeteer.launch({headless: false}).then(async browser => {
    const page = await browser.newPage();
    //We use here page.emulate so no more need to set the viewport separately
    //await page.setViewport({ width: 1280, height: 800 })
    await page.emulate(iPhonex);
    await page.goto('https://www.homedepot.com/');
    await page.screenshot({path: 'homedepot-iphoneX.png'});
    await browser.close();
});


// 5. <title> of Page
puppeteer.launch({headless: false}).then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    const title = await page.title()
    console.log(title)
    await browser.close();
});


// 6. Contrl keyboard
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];

(async () => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    // await page.emulate(iPhonex);
    await page.goto('https://www.google.com')
    // await page.focus('#tsf > div:nth-child(2) > div.A7Yvie.emca > div.zGVn2e > div > div.a4bIc > input')
    await page.keyboard.type('i am Nayab Samar autotyped !');
    await page.screenshot({path: 'nayab_keyboard.png'})
    await browser.close()
})()

// 7. Scrapping
(async () => {
    const browser = await puppeteer.launch({
        // args: ['--proxy-server=127.0.0.1:3030'],
        headless: false
    });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({Referer: 'https://sparktoro.com/'})
    await page.goto('https://sparktoro.com/trending');
    await page.waitForSelector('div.title > a');

    const stories = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('div.title > a'))
        return links.map(link => link.href).slice(0, 10)
    })

    console.log(stories);
    await browser.close();
})();


(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({Referer: 'https://google.com'})
    await page.goto('https://google.com');
    await page.waitForSelector('#fbarcnt');

    const stories = await page.evaluate(() => {
        // return document.getElementsByClassName('b0KoTc')[0].innerText; //

    })

    console.log(stories);
    await browser.close();
})();


// 8. Google WRS // not working
const browserFetcher = puppeteer.createBrowserFetcher();

puppeteer.launch({executablePath: '/home/nbsamar/projects'}, {headless: false}).then(async browser => {

    const page = await browser.newPage();
    await page.goto('https://www.google.com');
});


// 9. Form testing
(async () => {
    const browser = await puppeteer.launch({headless: false, slowMo: 100});
    const page = await browser.newPage();
    //Go to my page and wait until the page loads
    await page.goto('https://www.aymen-loukil.com/en/contact-aymen/', {waitUntil: 'networkidle2'});
    await page.waitForSelector('#genesis-content > article > header > h1');

    //type the name
    await page.focus('#wpcf7-f97-p311-o1 > form > p:nth-child(2) > label > span > input')
    await page.keyboard.type('PuppeteerBot');
    //type the email
    await page.focus('#wpcf7-f97-p311-o1 > form > p:nth-child(3) > label > span > input')
    await page.keyboard.type('PuppeteerBot@mail.com');
    //type the message
    await page.focus('#wpcf7-f97-p311-o1 > form > p:nth-child(4) > label > span > textarea')
    await page.keyboard.type("Hello Aymen ! It is me your PuppeteerBot, i test your contact form !");
    //Click on the submit button
    await page.click('#wpcf7-f97-p311-o1 > form > p:nth-child(5) > input')
    await page.screenshot({path: 'form.png', fullPage: true});
    await browser.close();
})();

// Using Cron to schedule
var CronJob = require('cron').CronJob;
var job = new CronJob({
    //runs every monday
    cronTime: '0 10 * * *',
    onTick: function () {
        const puppeteer = require('puppeteer');

        (async () => {

            //The previous script start
            const page = await browser.newPage();
            //Go to my page and wait until the page loads
            await page.goto('https://www.aymen-loukil.com/en/contact-aymen/', {waitUntil: 'networkidle2'});
            await page.waitForSelector('#genesis-content > article > header > h1');

            //type the name
            await page.focus('#wpcf7-f97-p311-o1 > form > p:nth-child(2) > label > span > input')
            await page.keyboard.type('PuppeteerBot');
            //type the email
            await page.focus('#wpcf7-f97-p311-o1 > form > p:nth-child(3) > label > span > input')
            await page.keyboard.type('PuppeteerBot@mail.com');
            //type the message
            await page.focus('#wpcf7-f97-p311-o1 > form > p:nth-child(4) > label > span > textarea')
            await page.keyboard.type("Hello Aymen ! It is me your PuppeteerBot, i test your contact form !");
            //Click on the submit button
            await page.click('#wpcf7-f97-p311-o1 > form > p:nth-child(5) > input')
            await page.screenshot({path: 'form.png', fullPage: true});

//The previous script end

        })();
    },
    start: false,
    timeZone: 'Europe/London'
});
job.start();


// 10. Automate
puppeteer.launch({headless: false}).then(async browser => {

    const page = await browser.newPage();

//start coverage trace
    await Promise.all([
        page.coverage.startJSCoverage(),
        page.coverage.startCSSCoverage()
    ]);

    await page.goto('https://www.cnn.com');

//stop coverage trace
    const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage(),
    ]);

    let totalBytes = 0;
    let usedBytes = 0;
    const coverage = [...jsCoverage, ...cssCoverage];
    for (const entry of coverage) {
        totalBytes += entry.text.length;
        for (const range of entry.ranges)
            usedBytes += range.end - range.start - 1;
    }

    const usedCode = ((usedBytes / totalBytes) * 100).toFixed(2);
    console.log('Code used by only', usedCode, '%');
    await browser.close();
});


// Devtool Tracing
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.emulate(iPhonex);
    //start the tracing
    await page.tracing.start({path: 'trace.json', screenshots: true});
    await page.goto('https://www.bmw.com')
    //stop the tracing
    await page.tracing.stop();
    await browser.close()
})()

// disable js
const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', request => {
        if (request.resourceType() === 'script')
            request.abort();
        else
            request.continue();
    });
    await page.goto('https://www.youtube.com');
    await page.screenshot({path: 'youtube-nojs.png'});

    await browser.close();
})();

