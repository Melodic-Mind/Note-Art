import path from 'path';

export default {
  entry: './lib/index.js',
  mode: 'production',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.dirname(new URL(import.meta.url).pathname),
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};