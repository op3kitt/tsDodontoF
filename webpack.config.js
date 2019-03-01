var nodeExternals = require('webpack-node-externals');
var path = require('path');
var isCoverage = process.env.NODE_ENV === 'coverage';

module.exports = {
  entry: './app.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  target: 'node',
  externals: [nodeExternals()],
};