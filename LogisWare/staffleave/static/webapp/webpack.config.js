const path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.js' // starting point
    },
    watch: true,
    devtool: 'source-maps',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: [
            '.js', '.jsx'
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },

    plugins: [
        new LiveReloadPlugin({
            port: 35730
        }),

        new ProgressBarPlugin()
    ],
    performance: {
        hints: false
    }
}