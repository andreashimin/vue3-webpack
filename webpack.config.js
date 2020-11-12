const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = (env, argv) => {
  const devMode = argv.mode === "development";

  const config = {
    entry: {
      app: "./src/entry.js",
      // app: "./src/index.js",
    },
    output: {
      filename: "[name].[contenthash:8].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "./",
    },
    target: "browserslist",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/,
          use: ["file-loader"],
        },
        {
          test: /\.vue$/,
          use: {
            loader: "vue-loader",
          },
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              exclude: /node_modules/,
              presets: [["@babel/preset-env"]],
            },
          },
        },
        {
          test: /\.css$/,
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
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[contenthash:8].css",
        chunkFilename: devMode ? "[id].css" : "[id].[contenthash:8].css",
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
      historyApiFallback: true,
    },
    ...(devMode ? { devtool: "inline-source-map" } : {}),
  };

  return config;
};
