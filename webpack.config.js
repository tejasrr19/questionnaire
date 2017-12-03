const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

const config = {
    entry:  __dirname + '/static/js/index.jsx',
    output: {
        path: __dirname + '/static/dist',
        filename: 'bundle.js',
        publicPath: '/static/js/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
      rules: [{
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        include: path.resolve(ROOT_PATH, 'static/public/img')
      }
    ]
    },
    devServer: {
    host: '0.0.0.0'
  }
};
module.exports = config;
