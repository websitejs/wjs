import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

module.exports = {
    devtool: 'source-map',
    module: {
        rules: [
            { // es6
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'//,
                    // options: {
                    //     presets: ['env']
                    // }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new ProgressBarPlugin()
    ]
};

