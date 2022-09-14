const path = require("path");
const copy = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const package = require('./package.json');

module.exports = (env, args)=>{
    const mode = args.mode ?? 'production';

    return {
        mode,
        entry: {
            index: `./src/index.ts`,
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: "all"
            }
        },
        devtool: mode === "development" ? "source-map" : undefined,
        module: {
            rules: [{
                    test: /\.ts$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.hbs$/,
                    loader: 'handlebars-loader',
                    options: {
                        precompileOptions: {
                            knownHelpersOnly: false,
                        },
                    }
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: '[name].[contenthash][ext][query]'
                    }
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: '[name].[contenthash][ext][query]'
                    }
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Test',
                favicon: './assets/favicon/favicon.ico',
                manifest: "./manifest.json",
                template: './src/index.html',
            }),
            new MiniCssExtractPlugin({
                filename: mode === "development" ? '[name].css' : '[name].[contenthash].css',
            }),
            new copy({
                    patterns: [
                        {
                            from: "./src/manifest.json",
                            to:   "./manifest.json",
                            // transform (content, path) {
                            //     var manifest = JSON.parse(content.toString());

                            //     // make any modifications you like, such as
                            //     manifest.version = package.version;

                            //     // pretty print to JSON with two spaces
                            //     manifest_JSON = JSON.stringify(manifest, null, 2);
                            //     return manifest_JSON;

                            // }
                        }, {
                            from: `./assets/favicon`,
                            to: "./favicon"
                        }
                        // {
                        //     from: `./src/data.json`,
                        //     to: "data.json"
                        // },
                    ]
                }
            ),
        ],
        resolve: {
            extensions: [".ts", ".js"],
            modules: [
                path.resolve("./src"),
                path.resolve("./node_modules")
            ]
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        }
    }
};