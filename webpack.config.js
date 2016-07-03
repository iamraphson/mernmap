/**
 * Created by Raphson on 7/2/16.
 */
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    //context: path.join('__dirname', 'src'),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./public/js/client.js",
    output: {
        path: __dirname + "/public/",
        filename: "client.min.js"
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            }
        ]
    },
    plugins: debug ? [] :[
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
}