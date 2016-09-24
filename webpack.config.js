const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin  = require('write-file-webpack-plugin');

module.exports = {
    devtool: 'devtool',

    entry: ['./src/index'],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/public/',
        pathinfo: true
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new WriteFilePlugin()
    ],

    module: {
        loaders: [
            { test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    }
};