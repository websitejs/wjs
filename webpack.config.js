/* jshint esversion: 6 */
const   path = require('path'),
        extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/index.js', './src/styles.scss'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: '#source-map',
    module: {
        rules: [
            { // es6
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            { // regular css files
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    use: 'css-loader?importLoaders=1&?sourceMap',
                }),
            },
            { // sass / scss
                test: /\.(sass|scss)$/,
                use: extractTextPlugin.extract(['css-loader?sourceMap', 'sass-loader?sourceMap'])
            }
        ]
    },
    plugins: [
        new extractTextPlugin({
            filename: 'bundle.css',
            allChunks: true
        })
    ]
};

