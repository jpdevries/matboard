var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './_build/js/main.js',
  output: { path: './assets/js/', filename: 'app.js' },
  externals: {
    "react": "React",
    "react-dom":"ReactDOM",
    "redux":"Redux",
    "react-redux":"ReactRedux"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
