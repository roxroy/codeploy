const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.resolve('client/public'),
    filename: 'app.js'
  },
  resolve: {
     extensions: ['.jsx', '.js', '.css'],
	},
  module: {
    loaders: [
      {
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader")
      }
    ]
  },
  // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
  plugins: [
        new ExtractTextPlugin("app.css")
  ]
}
