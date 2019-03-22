# jest-cucumber-puppeteer-example

[![CircleCI](https://circleci.com/gh/spirosikmd/jest-cucumber-puppeteer-example.svg?style=svg)](https://circleci.com/gh/spirosikmd/jest-cucumber-puppeteer-example)

Write UI tests using [Cucumber](https://github.com/cucumber/cucumber), [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin), [Puppeteer](https://github.com/GoogleChrome/puppeteer), and [Jest](https://facebook.github.io/jest/). It uses the [React TodoMVC](http://todomvc.com/examples/react/#/) project as a test UI. The Jest integration is made possible by the awesome [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer) and [jest-cucumber](https://github.com/bencompton/jest-cucumber) packages 🙌

Run `yarn` to install the dependencies and then `yarn test` to execute the UI tests.

To run the tests in headless mode:

```
$ HEADLESS=false yarn test
```
