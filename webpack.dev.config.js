var path = require('path')

module.exports = {
  devtool: 'eval-source-map',
  historyApiFallback: true,
  progress: true,
  stats: 'errors-only',
  entry: {
    chessball: [
      'webpack-dev-server/client?http://localhost:8080',
      './src/index'
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.spec.js', '.js', '.css']
  },
  output: {
    path: path.resolve(__dirname, './bin'),
    filename: 'bin/[name].js'
  },
  devServer: {
    contentBase: './src'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: ['babel?{"presets": ["stage-0", "es2015", "react"]}']
      }
    ]
  },
  sassLoader: {
    indentedSyntax: true
  }
}
