/* eslint-disable */
const webpack = require('webpack')
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

let src_folder = 'src_examples';
if(fs.existsSync('src')) {
    src_folder = 'src';
}

module.exports = {
    entry: {
        main: './wp_src/index_jatos.js'
    },
    output: {
        filename: "[name].js",
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
    ],
    resolve: {
        alias: {
            src_files: '../' + src_folder,
            process: "process/browser"
        },
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|wav|mp3|pdf|csv)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: RegExp('fonts/.*.(woff(2)?|ttf|eot|svg)$'),
                type: 'asset/resource',
            },
        ]
    },
};

let components_html_list = [];

glob.sync(src_folder + '/*.+(js|ts)').forEach(function(file) {
    const html_name = path.parse(file).name + '.html';
    components_html_list.push(html_name);

    module.exports.plugins.push(new HtmlWebpackPlugin({
        template: "html_templates/components.ejs",
        filename: html_name,
        templateParameters: {
            title: 'My experiment',
            entry_js: path.parse(file).base,
        }
    }));
});

module.exports.plugins.push(new HtmlWebpackPlugin({
    template: 'html_templates/index.ejs',
    filename: 'index.html',
    inject: false,
    templateParameters: {
        title: 'My experiment',
        components_html_list: components_html_list
    }
}));

module.exports.plugins.push(new HtmlWebpackTagsPlugin({
    tags: ['/assets/javascripts/jatos.js'],
    append: false
}));
