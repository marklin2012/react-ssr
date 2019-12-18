const path = require('path')
const ndeExternals = require('webpack-node-externals')
// 服务端 webpack
module.exports = {
  target: 'node',
  mode: 'development',
  entry: './server/index.js',
  externals: [ndeExternals()],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 才能支持 import 支持 jsx
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', ['@babel/preset-env']]
        }
      },
      {
        test: /.\.css/,
        use: ['isomorphic-style-loader', 'css-loader'],
      },
    ]
  }
}