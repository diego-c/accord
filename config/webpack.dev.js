const common = require('./webpack.common')
    , merge = require('webpack-merge')
    , path = require('path');

module.exports = merge(common, {
    output: {
        chunkFilename: './js/[name].[hash].js',
        filename: './js/[name].[hash].js',
        path: path.resolve(__dirname, '../build')
    },
    devtool: 'cheap-eval-module-source-map',
    devServer: {
        publicPath: '/',
        contentBase: path.resolve(__dirname, '../build'),
        port: 1337
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|gif|png|svg|webm|avi|mkv|mp(3|4)|flac|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    }
});