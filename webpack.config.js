const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {main: './src/index.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь для выходных файлов режима разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, 

    open: true // сайт будет открываться сам при запуске npm run dev
  },

  module: {
    rules: [ 
      // правила для бабеля
      {
        // искать все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules
        exclude: '/node_modules/'
      }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
  ]
}