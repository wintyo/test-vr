import path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AutoDllWebpackPlugin from 'autodll-webpack-plugin';

export default {
  entry: {
    index: [path.resolve(__dirname, './src/scripts/entry.ts')],
  },
  output: {
    path: './dist',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg|ico|mov|mp4|glb)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: (url) => {
                return path.relative('src', url);
              },
              publicPath: (url) => {
                return './' + path.relative('src', url).replace(/\\/g, '/');
              },
              emitFile: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src/scripts/'),
      '~models': path.resolve(__dirname, './src/models/'),
    },
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/pug/index.pug'),
      hash: true,
      inject: true,
    }),
    new AutoDllWebpackPlugin({
      inject: true,
      filename: '[name].js',
      entry: {
        vendor: [
          'three',
        ],
      },
    }),
  ],
} as webpack.Configuration;
