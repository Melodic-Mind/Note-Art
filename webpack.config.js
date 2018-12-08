const path = require('path')
const libraryName = 'note-art'
const outputFile = libraryName + '.js'
module.exports = {
  entry: __dirname + '/src/index.js',
  mode: 'development',
  output: {
    filename: outputFile,
    path: path.resolve(__dirname, 'dist'),
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folde,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["@babel/plugin-proposal-object-rest-spread"]
          }
        }
      },
      {
        test: /\.mp3$/,
        loader: 'url-loader'
      }
    ]
  },
}