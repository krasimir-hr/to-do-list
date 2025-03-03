const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   mode: 'development',
   entry: './src/js/index.js',
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
   },
   devtool: 'eval-source-map',
   devServer: {
      watchFiles: ['./src/index.html'],
      static: {
         directory: path.resolve(__dirname, 'public'),
         publicPath: '/',
      },
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html',
      }),
   ],
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.html$/i,
            loader: 'html-loader',
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[name][text]',
            },
         },
      ],
   },
};
