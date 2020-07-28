const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {minimize: true}
        }
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  },

  plugins: [
    new htmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new htmlWebPackPlugin({
      template: './src/covid-19.html',
      filename: 'covid-19.html'
    }),
    new htmlWebPackPlugin({
      template: './src/layanan.html',
      filename: 'layanan.html'
    })
  ]
}