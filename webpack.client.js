const path = require('path')
// 服务端 webpack
module.exports = {
  mode: 'development',
  //  客户端入口
  entry: './client/index.js',
  //  客户端输出  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
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

    ]
  }
}