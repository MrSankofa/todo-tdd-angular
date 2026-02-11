module.exports = function (config) {
  const path = require('path');

  // Try to require the Angular Karma plugin if it's installed. If not, continue without it
  let ngKarmaPlugin = null;
  let ngFramework = null;
  try {
    ngKarmaPlugin = require('@angular-devkit/build-angular/plugins/karma');
    ngFramework = '@angular-devkit/build-angular';
  } catch (e) {
    // package not installed; tests will still run with ng test when dependencies are installed.
    // This prevents IntelliJ/Karma from crashing when the plugin isn't present in node_modules.
  }

  const plugins = [
    require('karma-jasmine'),
    require('karma-chrome-launcher'),
    require('karma-coverage'),
    require('karma-jasmine-html-reporter')
  ];

  if (ngKarmaPlugin) {
    plugins.push(ngKarmaPlugin);
  }

  const frameworks = ['jasmine'];
  if (ngFramework) frameworks.push(ngFramework);

  config.set({
    basePath: '',
    frameworks,
    plugins,
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: path.join(__dirname, './coverage'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true
  });
};
