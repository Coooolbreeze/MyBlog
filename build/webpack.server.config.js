const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base.config')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const ossConfig = require('../config').oss

let config

const isDev = process.env.NODE_ENV === 'development'

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  })
]

if (isDev) {
  plugins.push(new VueServerPlugin())
} else {
  plugins.push(new MiniCssExtractPlugin({
    filename: 'style.[contenthash:8].css'
  }))
}

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../src/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build'),
    publicPath: isDev ? '/dist/' : ossConfig.host
    // publicPath: '/dist/'
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.css/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins
})

config.resolve = {
  alias: {
    'request': path.join(__dirname, '../src/model/server-request.js')
  }
}

module.exports = config
