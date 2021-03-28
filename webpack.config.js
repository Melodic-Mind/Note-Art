const path        = require('path')

module.exports = {
  entry:     "./src/index.ts",
  output:      {
    filename:       'note-art.js',
    path:           path.resolve(__dirname, 'dist'),
  },
  devtool: "source-map",
  resolve:     {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"],
    alias:   {
      resources: path.resolve(__dirname, 'src/resources'),
      src: path.resolve(__dirname, 'src/'),
      built: path.resolve(__dirname, 'built/')
    },
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" },
    ],
  },
}
