const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: {main: './src/pages/index.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
  mode: 'development',
  devtool  : "inline-source-map", //для более удобной отладки в devtools
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
      },
      {
        // выбор всех изображений и шрифтов
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        // правило для CSS-файлов
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
}