const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor")
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild")
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: "https://rarocrud-frontend-88984f6e4454.herokuapp.com/",
//     env: {
//       apiUrl: "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/",
//       // TAGS: "@only",
//     },
//     specPattern: "cypress/e2e/**/*.feature",
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//       on("file:preprocessor", cucumber())
//     },
//   },
// });

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    env: {
      apiUrl: "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/",
      // TAGS: "@only",
    },
    baseUrl: "https://rarocrud-frontend-88984f6e4454.herokuapp.com/",
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      await addCucumberPreprocessorPlugin(on, config)

      on("file:preprocessor", createBundler({ plugins: [createEsbuildPlugin(config)] }))

      return config
    },
  },
});
