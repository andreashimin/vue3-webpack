const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = (env, argv) => {
  const devMode = argv.mode === "development";
  const config = {
    entry: {
      app: "./src/entry.js",
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "./",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            devMode
              ? "style-loader"
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    esModule: false,
                  },
                },
            "css-loader",
          ],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: ["file-loader"],
        },
        {
          test: /\.vue$/,
          use: {
            loader: "vue-loader",
          },
        },
        {
          test: /\.js?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            devMode
              ? "style-loader"
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    esModule: false,
                  },
                },
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                additionalData: `
                  @import "@/styles/variables.scss";
                `,
              },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.VIP_DOMAIN": "https://pro.104.com.tw/vip",
      }),
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        title: "My First App",
        filename: "index.html",
        template: "./src/template/index.html",
      }),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      port: 8899,
      hot: true,
      hotOnly: true,
      historyApiFallback: true,
    },
    ...(devMode ? { devtool: "inline-source-map" } : {}),
  };

  return config;
};
