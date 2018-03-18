const path = require('path'),
    HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, '../src/index.tsx')
    },
    output: {
        filename: './js/[name]_[hash].js',
        path: path.resolve(__dirname, '../build')
    },
    devServer: {
        publicPath: '/',
        contentBase: path.resolve(__dirname, '../build'),
        port: 1337
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.resolve(__dirname, '../src/', 'scss/')
                            ],
                            sourceMap: true
                        }
                    }
                ]
            },
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
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../src/', 'index.html'),
            title: 'React-TS App',
            cache: true,
            inject: 'body'
        })
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}