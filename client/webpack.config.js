// Imports
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Webpack plugin that generates HTML file and injects bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor"
      }),
      // Inject manifest
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './src-sw.js'
      }),
      // Create a manifest.json
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Text Editor",
        short_name: "Text",
        description: "Keep notes here.",
        background_color: "#7eb4e2",
        theme_color: "#7eb4e2",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons")
          }
        ]
      })
    ],

    module: {
      rules: [
        // CSS loader
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        // babel-loader
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread', 
                '@babel/transform-runtime'
              ]
            }
          }
        }
      ],
    },
  };
};
