const common = require('./webpack.common')
    , merge = require('webpack-merge');

module.exports = merge(common, {
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