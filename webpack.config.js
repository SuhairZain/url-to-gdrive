/**
 * Created by SuhairZain on 12/5/16.
 */

var webpack = require('webpack');

var PROD = JSON.parse(process.env.PROD_ENV || '0');

var plugins = [];

if(PROD){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    );
    plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    );
}

module.exports = {
    entry: './src/main.jsx',
    output: {
        path: "./dist",
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    },
    plugins: plugins
};