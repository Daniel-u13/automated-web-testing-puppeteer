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

# run the test
$ node google-pay-test.js
```

