# Automated Google Pay testing with Puppeteer
> 🧪 A way to test your Google Pay integrations on the web

## Requirements
- A running Chrome instance with a logged-in user
- The logged-in user needs to be part of the Google Pay [test card group](https://groups.google.com/g/googlepay-test-mode-stub-data?pli=1)
- Chrome needs to be started with the `--remote-debugging-port=<port>` flag.
- Adjust `workingExePath` and `workingDataBaseDir`.

## Installation & Usage
```sh
# install the dependencies
$ npm install

# run the test
$ node google-pay-test.js
```

