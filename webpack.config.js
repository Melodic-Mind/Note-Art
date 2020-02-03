const path = require('path');
const libraryName = 'note-art';
const outputFile = '[name].js';

module.exports = {
  entry: {
    'note-art': __dirname + '/src/index.js',
    theory: __dirname + '/src/theory/index.js',
    notation: __dirname + '/src/notation/index.js',
  },
  output: {
    filename: outputFile,
    path: path.resolve(__dirname, 'dist'),
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'), 'node_modules/tone', 'node_modules',
    ],
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
    ],
  },
};
