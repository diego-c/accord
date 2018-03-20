const common = require('./webpack.common')
    , webpack = require('webpack')
    , merge = require('webpack-merge')
    , path = require('path')
    , PWAManifest = require('webpack-pwa-manifest');

module.exports = merge(common, {
    entry: {
        bundle: ['babel-polyfill', path.resolve(__dirname, '../client/index.tsx')]
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|gif|png|svg|webm|avi|mkv|mp(3|4)|flac|webp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            fallback: 'file-loader',
                            name: '[name].[hash].[ext]',
                            publicPath: '/assets/',
                            outputPath: 'assets'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "__PRODUCTION__": JSON.stringify(true)
        }),

        new PWAManifest({
            name: 'Accord',
            short_name: 'Accord',
            description: 'A torrent-sharing chat platform',
            background_color: '#dbdbdb',
            icons: [
                {
                    src: path.resolve(__dirname, '../client/', 'img/accord-logo.svg'),
                    sizes: [96, 128, 144, 192, 256, 384, 512],
                    destination: './icons/'
                }
            ]
        })
    ]
});