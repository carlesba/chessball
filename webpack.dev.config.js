// var webpack = require('webpack')

module.exports = {
  devtool: 'inline-source-map',
  debug: true,
  cache: false,
  process: true,
  stats: {
    colors: true
  },
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
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
    // new webpack.optimize.UglifyJsPlugin({minimize: true})
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
