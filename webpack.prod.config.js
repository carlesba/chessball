var webpack = require('webpack')

module.exports = {
  devtool: 'inline-source-map',
  stats: {
    colors: true
  },
  entry: [
    './src/index'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'chessball.js',
    publicPath: '/dist/'
  },
  resolve: {
    root: './',
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.sass$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      }
    ]
  },
  sassLoader: {
    indentedSyntax: true
  }
}
