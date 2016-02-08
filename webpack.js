'use strict';

require('es6-promise').polyfill();

var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fse = require('fs-extra');

// Always restart from a blank page
fse.emptyDirSync(__dirname + '/www/build');

var config = {
  entry: [
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './app/components/main.jsx'
  ]
  .concat(glob.sync('./app/css/*.css'))
  ,
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    modulesDirectories: [ 'node_modules', 'app' ]
  },
  output: {
    path: path.join(__dirname, '/www/build/'),
    filename: 'bundle-[hash].js',
    chunkFilename: '[id].[hash].bundle.js',

    // // @see https://webpack.github.io/docs/library-and-externals.html
    // libraryTarget: 'var',
    // library: 'appState'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: [
          'babel-loader?sourceMaps=inline&optional=runtime'
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.svg($|\?)|\.jp(e)?g|\.gif$|.png$/,
        loaders: [
          'file-loader?name=img/[name].[ext]'
        ]
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
        loaders: [
          'file-loader?name=fonts/[name].[ext]'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html', // Load a custom template
      inject: 'body'
    }),
  ]
};

module.exports = config;
