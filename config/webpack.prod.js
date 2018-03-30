const common = require('./webpack.common')
    , webpack = require('webpack')
    , merge = require('webpack-merge')
    , path = require('path')
    , PWAManifest = require('webpack-pwa-manifest');

module.exports = merge(common, {
    mode: 'production',
    entry: {
        bundle: ['babel-polyfill', path.resolve(__dirname, '../client/index.tsx')]
    },
    optimization: {
        runtimeChunk: true
    },
    output: {
        chunkFilename: './js/[name].[chunkhash].js',
        filename: './js/[name].[chunkhash].js',
        path: path.resolve(__dirname, '../build')
    },
    devtool: 'source-map',
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
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter",
        "react-router-dom": "ReactRouterDOM",
        "redux": "Redux",
        "redux-thunk": "ReduxThunk",
        "react-redux": "ReactRedux",
        "axios": "axios"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": 'production'
        }),

        new PWAManifest({
            name: 'Accord',
            short_name: 'Accord',
            description: 'A torrent-sharing chat platform',
            background_color: '#dbdbdb',
            icons: [
                {
                    src: path.resolve(__dirname, '../client/assets/', 'img/accord-logo.svg'),
                    sizes: [96, 128, 144, 192, 256, 384, 512],
                    destination: './icons/'
                }
            ]
        })
    ]
});