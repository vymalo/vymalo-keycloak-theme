import { Configuration } from "webpack";
import path from "node:path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { EsbuildPlugin } from "esbuild-loader";

const config: Configuration = {
    entry: {
        main: "./src/index.ts"
    },
    devtool: "source-map",
    output: {
        clean: true,
        filename: pathData => {
            return pathData.chunk?.name === "runtime" || pathData.chunk?.name === "main"
                ? "js/[name].js"
                : "js/[name]-[fullhash].js";
        },
        path: path.resolve(__dirname, "data/common/resources"),
        chunkFilename: "js/chunks/[name]-[fullhash].js"
    },
    mode: "production",
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            {
                // Match `.js`, `.jsx`, `.ts` or `.tsx` files
                test: /\.[jt]sx?$/,
                loader: "esbuild-loader"
            },
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.(s|)[ca]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            filename: "js/split/[name]-[fullhash].js",
            minChunks: 1,
            minSize: 100_000
        },
        minimizer: [
            new EsbuildPlugin({
                target: "esnext",
                css: true
            }),
            new CssMinimizerPlugin()
        ],
        minimize: true,
        runtimeChunk: "single"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/chunks/[id].css"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../..", "assets-img"),
                    to: path.resolve(__dirname, "data/common/resources/img/")
                }
            ]
        })
    ]
};

export default config;
