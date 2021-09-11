const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 4000,
    compress: true,
    watchFiles: {
      paths: ["src", "public"],
    },
    open: true,
    hot: true,
    historyApiFallback: true,
    client: {
      logging: "info",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
        resolve: {
          extensions: [".js", ".jsx"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new webpack.EnvironmentPlugin({
      BASE_URL: "http://localhost:4001/api",
      IMAGE_URL: "http://localhost:4001/images",
    }),
  ],
};
