/* eslint-env node */
/* eslint no-console: off */

module.exports = function(config) {
  var configuration = {
    basePath : 'www/',

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      // 'karma-phantomjs-launcher',
      // 'karma-detect-browsers',
      'karma-jasmine',
      'karma-coverage',
      'karma-junit-reporter',
      'karma-html-reporter'
    ],

    frameworks : [
      'jasmine',
    ],

    reporters : [
      'progress',
      'coverage',
      'html'
    ],

    files : [
      // Custom Elements v0
      'static/bower_components/webcomponentsjs/webcomponents-lite.js',

      // Custom Elements v1
      'static/bower_components/shadydom/cloudydom.min.js',
      'static/bower_components/custom-elements/custom-elements.min.js',

      'static/bower_components/jquery/dist/jquery.min.js',
      'static/bower_components/karma-read-json/karma-read-json.js',
      { pattern: "static/bower_components/**",    included: false, served: true, watched: false },
//      { pattern: "static/elements/resources/*",   included: false, served: true, watched: true },
      'static/class/Builder.js',
      'static/class/BuildSingleElement.js',
      'static/class/BuildName.js',
      'static/components/InstallationAbstract.js',
      'static/!(bower_components)/**/*.js',
      '../tests/unitjs/kickoff.js',
      '../tests/unitjs/mocks/*.js',
      '../tests/unitjs/*.js',
      { pattern: "../tests/resources/**",         included: false, served: true, watched: false },
    ],

    autoWatch : true,

    browsers: [ 'FirefoxHeadless', 'ChromeHeadless' ],

    // https://github.com/karma-runner/karma-firefox-launcher/issues/76
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: [ '-headless' ],
      },
    },

    preprocessors: {
      '**/(!bower_components)/**/*.js': [ 'coverage' ],
    },

    coverageReporter: {
      type :  'lcov',
      dir :   __dirname + '/target/',
      subdir: 'unit/'
    },

    htmlReporter: {
      outputDir: __dirname + '/target/js/html/',
    //   // templatePath: '../tmp/jasmine_template.html'
    }
  };

  config.set(configuration);
};
