/**
 * Created by Raphson on 7/2/16.
 */
const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');


module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index'
    ],

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],

    module: {
        loaders: [
            { test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/ },
            { test: /\.scss?$/,
                loader: 'style!css!sass',
                include: path.join(__dirname, 'src', 'styles') },
            { test: /\.png$/,
                loader: 'file' },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file'}
        ]
    }
};