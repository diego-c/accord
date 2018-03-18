const common = require('./webpack.common')
    , webpack = require('webpack')
    , merge = require('webpack-merge')
    , path = require('path')
    , PWAManifest = require('webpack-pwa-manifest');

module.exports = merge(common, {
    entry: {
        bundle: ['babel-polyfill', path.resolve(__dirname, '../src/index.tsx')]
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
                    src: path.resolve(__dirname, '../src/', 'img/accord-logo.svg'),
                    sizes: [96, 128, 144, 192, 256, 384, 512],
                    destination: './icons/'
                }
            ]
        })
    ]
});