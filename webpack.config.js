module.exports = {
  devtool: 'inline-source-map',
  debug: true,
  cache: false,
  process: true,
  stats: {
    colors: true
  },
  entry: [
    'webpack-dev-server/client?http://localhost:8888',
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
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
