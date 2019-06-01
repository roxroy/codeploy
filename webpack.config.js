const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './client/src/index.js',
  output: {
    path: path.resolve('client/public'),
    filename: 'app.js'
  },
  resolve: {
     extensions: ['.jsx', '.js', '.css'],
	},
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
            },
          },
          'css-loader',
        ],
      }
    ]
  },
}
