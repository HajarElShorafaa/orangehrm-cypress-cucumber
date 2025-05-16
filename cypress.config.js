const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {addCucumberPreprocessorPlugin} = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const cucumber = require("@badeball/cypress-cucumber-preprocessor");
const cucumberConfig = require("./cypress-cucumber-preprocessor.config.js");

module.exports = defineConfig({
  e2e: {
    specPattern: "**/e2e/features/*.feature",
    //stepDefinitions: "./step_definitions/loginSteps.js", // Step definitions path
    supportFile:false,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config, cucumberConfig);
      on("file:preprocessor",
         createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
      return config;
    },
  },
});
