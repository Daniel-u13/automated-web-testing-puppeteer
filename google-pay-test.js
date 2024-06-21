const puppeteer = require('puppeteer');
const os = require('os');
const username = os.userInfo().username;
const workingExePath = '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary';
const workingDataBaseDir = `/Users/${username}/Library/Application\ Support/Google/Chrome\ Canary`;

let browser;
(async () => {
  /*
    Start Chrome from the CLI with the following option before executing this test (for MacOS)
    and make sure you have a logged in user:
    
    /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --remote-debugging-port=9222

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

  const newPaymentMethod = await googlePayIframe.$$('xpath/.//span[contains(text(), \'Test Card: Mastercard\')]');
  //const newPaymentMethod = await googlePayIframe.$$('xpath/.//div[contains(., \'YAY_VISA_1337\')]/text()/..');
  await newPaymentMethod[2].click();

  await delay(1000);
  await googlePayIframe.click('xpath/.//span[text()=\'Continue\']');
  //await googlePayIframe.click('xpath/.//span[text()=\'Pay now\']');

})()
  .catch(err => console.error(err))
  .finally(() => browser?.disconnect());

  function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }