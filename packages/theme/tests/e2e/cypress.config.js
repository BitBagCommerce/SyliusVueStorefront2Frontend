const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fixturesFolder: 'fixtures',
  viewportHeight: 1080,
  viewportWidth: 1920,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'report/assets/screenshots',
  video: false,
  reporter: '../../../../node_modules/mochawesome',
  reporterOptions: {
    reportDir: 'report',
    reportFilename: 'report',
    overwrite: false,
    html: false,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'support/index.js',
  },
});
