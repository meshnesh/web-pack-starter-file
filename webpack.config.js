const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const port = process.env.PORT || 9000

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", 'sass-loader'],
                publicPath: './dist'
            })
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: port,
        stats: 'errors-only',
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Foundation webpack',
            minify: {
                collapseWhitespace: false //minifies the build index.html
            },
            hash: true,
            template: './src/index.ejs', // Load a custom template (ejs by default see the FAQ for details) 
        }),
        new ExtractTextPlugin({
            filename: 'foundation.min.css',
            allChunks: true
        })
    ]
}