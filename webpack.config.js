const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('webpack-cleanup-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
    },
    // devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', 'postcss-loader']
            //     })
            // },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: true}},
               {loader: 'postcss-loader', options: {sourceMap: true}},
                        {loader: 'sass-loader', options: {sourceMap: true}}
                ]
            },
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: [
            //             {loader: 'css-loader', options: {sourceMap: true}},
            //             {loader: 'postcss-loader', options: {sourceMap: true}},
            //             {loader: 'sass-loader', options: {sourceMap: true}}
            //             ]
            //     })
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [

        new CleanWebpackPlugin(['dist']),
        // new ExtractTextPlugin('styles.css'),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/views/index.html',

        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8085,
            proxy: 'http://localhost:8080/'
        }, {
            reload: false
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            // Util: "exports-loader?Util!bootstrap/js/dist/util",
            // Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            // ...
        }),
        new CopyWebpackPlugin([{
            from: 'src/img',
            to: 'img'
        }]),

    ]
};