const common = require('./webpack.common')
    , webpack = require('webpack')
    , merge = require('webpack-merge')
    , path = require('path')

module.exports = merge(common, {
    entry: {
        bundle: ['babel-polyfill', path.resolve(__dirname, '../src/index.tsx')]
    },
    plugins: [
        new webpack.DefinePlugin({
            "__PRODUCTION__": JSON.stringify(true)
        })
    ]
});