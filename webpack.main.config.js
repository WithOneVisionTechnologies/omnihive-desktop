const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    /**
     * This is the main entry point for your application, it's the first file
     * that runs in the main process.
     */
    entry: "./src/main.ts",
    // Put your normal webpack config below here
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
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets"),
                    to: path.resolve(__dirname, ".webpack", "main", "assets"),
                },
            ],
        }),
    ],
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json", ".png"],
    },
};
