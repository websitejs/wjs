/* jshint esversion: 6 */
const   path = require('path'),
        extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/index.js', './src/styles.scss'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
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
                    use: [
                        { loader: 'style-loader', options: { sourceMap: true }},
                        { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true }},
                        { loader: 'postcss-loader', options: { plugins: [ require('autoprefixer')() ], sourceMap: true }}
                    ]
                })
            },
            { // sass / scss
                test: /\.(sass|scss)$/,
                use: extractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true }}, 
                        { loader: 'postcss-loader', options: { plugins: [ require('autoprefixer')(), require('cssnano')({ discardComments: { removeAll: true }, safe: true, sourcemap: true}) ], sourceMap: true }},
                        { loader: 'sass-loader', options: { sourceMap: true }}
                    ]
                })
            }
        ]
    },
    plugins: [
        new extractTextPlugin({
            filename: 'bundle.min.css',
            allChunks: true
        })
    ]
};

