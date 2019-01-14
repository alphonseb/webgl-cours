const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common')

module.exports = webpackMerge(commonConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader']
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
})
