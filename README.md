# Automated Google Pay testing with Puppeteer
> 🧪 A way to test your Google Pay integrations on the web

![Google Pay testing](google-pay-testing.gif)

## Requirements
- A running Chrome instance with a logged-in user
- Chrome needs to be started with the `--remote-debugging-port=<port>` and `--user-data-dir=<dir>` flags.

  For example on macOS when using Chrome Canary:

  ```sh
  $ /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --remote-debugging-port=9222 --user-data-dir=chrome-remote-debugging
  ```

## Installation & Usage
```sh
# install the dependencies
$ npm install

# run the Google Pay test
$ node google-pay-test.js
```

## Lower Limb Anatomy Guide

An interactive HTML-based anatomy reference covering the bones, muscles, nerves, and vasculature of the lower limb. Includes expandable region cards, clinical correlations, and a 10-question quiz with instant feedback.

**Open the guide:**
Open `lower-limb-anatomy-guide.html` in any browser.

**Run the Puppeteer tests:**
```sh
$ node lower-limb-anatomy-test.js
```

The test suite validates navigation, section visibility, expandable cards, table content, and quiz functionality using headless Puppeteer.

