const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    target: "electron-renderer",
    module: {
        rules: [
            {
                test: /\.node$/,
                use: "node-loader",
            },
            {
                test: /\.(m?js|node)$/,
                parser: { amd: false },
                use: {
                    loader: "@vercel/webpack-asset-relocator-loader",
                    options: {
                        outputAssetBase: "native_modules",
                    },
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|\.webpack)/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                auto: true,
                                localIdentName: "[name]__[local]__[hash:base64:5]",
                            },
                        },
                    },
                    { loader: "postcss-loader" },
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "postcss-loader" }],
                exclude: /\.module\.css$/,
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets"),
                    to: path.resolve(__dirname, ".webpack", "renderer", "assets"),
                },
            ],
        }),
        new Dotenv(),
    ],
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".png"],
    },
};
