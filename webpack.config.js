const webpack = require('webpack');
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
      }
    ]
    },
    devServer: {
    host: '0.0.0.0'
  }
};
module.exports = config;
