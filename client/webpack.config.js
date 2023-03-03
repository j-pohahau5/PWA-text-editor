const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

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
      new HtmlWebpackPlugin({
				template: "index.html",
				title: "PWA Text Editor",
			}),
      new WebpackPwaManifest({
        filename: "manifest.json",
        name: 'Text Editor PWA App',
        short_name: 'Text Editor',
        description: 'coding text editor',
        icons: [],
        orientation: "portrait",
				display: "standalone",
				start_url: ".",
      }),
      new InjectManifest({
				swSrc: "./src-sw.js",
				// more configuration here.
			}),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};


// new WebpackPwaManifest({

//   start_url: './',
//   background_color: '#ffffff',
//   theme_color: '#2196f3',
//   publicPath: './',
//   icons: [
//     {
//       src: path.resolve('src/images/logo.png'),
//       sizes: [96, 128, 192, 256, 384, 512],
//       destination: path.join('assets', 'icons'),
//     },
//   ]
// }),