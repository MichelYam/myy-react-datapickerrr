const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public/css',
          to: 'css',
        },
      ],
    }),
  ],
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    port: 4000,
  },
};
