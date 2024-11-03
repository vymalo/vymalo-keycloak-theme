import { Configuration } from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const config: Configuration = {
  entry: {
    main: './src/index.ts'
  },
  devtool: 'inline-source-map',
  output: {
    clean: true,
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'web-store/common/resources'),
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(s|)[ca]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/chunks/[id].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets-img'),
          to: path.resolve(__dirname, 'web-store/common/resources/img/')
        },
      ],
    }),
  ],
};

export default config;