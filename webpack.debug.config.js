const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/react"] }
      },
      {
        test: /\.(sc|c|sa)ss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader],
      },
      {
        test: /\.(sc|c|sa)ss$/,
        exclude: /node_modules/,
        loader: "css-loader",
        options: {
          import: false
        }
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "lib/"),
    // publicPath: "/dist/",
    filename: "dist/bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    hotOnly: true
  },
  plugins: [
    // new CopyPlugin([{
    //   from: './public/package.dev.json',
    //   to: '../package.json'
    // }]),
    new MiniCssExtractPlugin({
      filename: 'dist/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};