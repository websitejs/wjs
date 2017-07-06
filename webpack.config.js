/* jshint esversion: 6 */
var config = require('./project.config.js');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
    entry: ['./src/index.js', './src/styles.scss'],
    output: {
        path: path.resolve(__dirname, config.folders.build.root),
        filename: path.relative(config.folders.build.root, config.folders.build.js) + '/' + config.jsFileName + '.min.js'
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
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')(),
                                require('cssnano')({
                                    discardComments: {
                                        removeAll: true
                                    },
                                    zindex: false,
                                    discardUnused: false,
                                    mergeIdents: false,
                                    reduceIdents: false,
                                    safe: true,
                                    sourcemap: true
                                })
                            ]
                        }
                    }]
                })
            },
            { // sass / scss
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')(),
                                require('cssnano')({
                                    discardComments: {
                                        removeAll: true
                                    },
                                    zindex: false,
                                    discardUnused: false,
                                    mergeIdents: false,
                                    reduceIdents: false,
                                    safe: true,
                                    sourcemap: true
                                })
                            ]
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: path.relative(config.folders.build.root, config.folders.build.css) + '/' + config.cssFileName + '.min.css',
            //path: path.resolve(__dirname, 'dist/css'),
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false,
            sourceMap: true
        }),
        new CopyWebpackPlugin([{
            from: config.folders.src.assets.root,
            to: config.folders.build.assets.root
        }]),
        new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
        new ProgressBarPlugin()
    ]
};

