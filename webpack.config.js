const path = require("path");
const copy = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (env, args) => {
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
            new WebpackPwaManifest({
                // publicPath: './',
                display: "standalone",
                name: "Portfolio 3",
                description: "Portfolio 3",
                short_name: "Port3",
                // start_url: "/port3/index.html",
                theme_color: "#ffffff",
                background_color: "#ffffff",
                icons: [
                    { src: "./assets/favicon/android-chrome-192x192.png", sizes:"192x192",type: "image/png"},
                    { src: "./assets/favicon/android-chrome-512x512.png", sizes:"512x512",type: "image/png"}
                ]
            }),
            new HtmlWebpackPlugin({
                title: 'Portfolio 3',
                favicon: './assets/favicon/favicon.ico'
            }),
            new MiniCssExtractPlugin({
                filename: mode === "development" ? '[name].css' : '[name].[fullhash].css',
            }),
            // new copy({
            //         patterns: [
            //             {
            //                 from: `./src/data.json`,
            //                 to: "data.json"
            //             },
            //         ]
            //     }
            // )
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