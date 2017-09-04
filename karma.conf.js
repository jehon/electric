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
      'static/class/SingleElementBuilder.js',
      'static/!(elements,bower_components)/**/*.js',
      'static/elements/*.js',
      '../tests/unitjs/mocks/*.js',
      '../tests/unitjs/*.js',
    ],

    autoWatch : true,

    browsers: [ 'Firefox' ],

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
