const puppeteer = require('puppeteer');

let browser;
(async () => {
  /*
    Start Chrome from the CLI with the following option before executing this test and make sure you have a logged in user.
    For macOS this would look like this:
    
    /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --remote-debugging-port=9222 --user-data-dir=chrome-remote-debugging

  */
  const browserURL = 'http://127.0.0.1:9222';
  browser = await puppeteer.connect({ browserURL });  

  const page = await browser.newPage();
  await page.goto('https://gpay-live-demo.web.app');

  await page.click('#gpay-button-online-api-id');

  await delay(4000);
  
  const target = await browser.waitForTarget((t) => {
    return t.type() === 'page' && t.url().includes('pay.google.com/gp/p/ui/pay');
  });

  const googlePayTab = await target.asPage();
  const iframeElementHandle = await googlePayTab.$('iframe[name="sM432dIframe"]');
  const googlePayIframe = await iframeElementHandle.contentFrame();

  await googlePayIframe.click('xpath/.//img[contains(@alt, \'Show list of payment methods.\')]');

  await delay(1000);

  const newPaymentMethod = await googlePayIframe.$$('xpath/.//div[contains(., \'Test Card: Mastercard\')]/text()/..');
  await newPaymentMethod[1].click();

  await delay(1000);
  await googlePayIframe.click('xpath/.//span[text()=\'Pay\']');

  // or if you have a Continue button:
  //await googlePayIframe.click('xpath/.//span[text()=\'Continue\']');

})()
  .catch(err => console.error(err))
  .finally(() => browser?.disconnect());

  function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }