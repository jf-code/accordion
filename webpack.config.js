const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = env => {
    return {
        mode: env.production ? 'production' : 'development',
        entry: './src/index.js',
        output: {
            library: 'Accordion',
            libraryTarget: 'umd',
            libraryExport: 'default',
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
                }
            ]
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname, 'index.html')
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        optimization: {
            minimize: env.production,
            minimizer: [new TerserPlugin()]
        }
    };
};
