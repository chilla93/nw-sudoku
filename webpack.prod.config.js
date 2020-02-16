const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: "./src/index.js",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/react"] }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "lib/"),
    // publicPath: "dist/",
    filename: "dist/bundle.js"
  },
  // devServer: {
  //   contentBase: path.join(__dirname, "public/"),
  //   port: 3000,
  //   publicPath: "http://localhost:3000/dist/",
  //   hotOnly: true
  // },
  plugins: [
    new CopyPlugin([
      {
        from: 'public/',
        to: './',
        ignore: ['package*.json'],
      },
      {
        from: 'public/package.prod.json',
        to: './package.json',
      }
    ]),
    // new webpack.HotModuleReplacementPlugin()
  ]
};