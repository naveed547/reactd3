// <reference types="webpack-env" />
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: ['./client/src/index.tsx'],
	devtool: '',
	mode: 'production',
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'client/distr'),
		publicPath: ' ',
	},
	plugins: [
		new CleanWebpackPlugin(['./client/distr', './client/dist']),
		new webpack.ContextReplacementPlugin(
			/graphql-language-service-interface[\\/]dist$/,
			new RegExp('^\\./.*\\.js$'),
		),

		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'client/src/index.html'),
			filename: 'index.html',
		}),
	],
	module: {
		rules: [{
			test: /\.(scss|css)$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
		},
		{
			test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
			exclude: /icons/,
			use: ['file-loader'],
		},
		{
			test: /\.svg(\?\S*)?$/,
			use: ['file-loader'],
		},
		{
			test: /\.(gif|jpg|png|ico)(\?\S*)?$/,
			use: ['url-loader'],
		},
		{ test: /\.(js|jsx|mjs)$/, loader: 'babel-loader', exclude: /node_modules/ },
		{ test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ },
		{
			enforce: 'pre',
			test: /\.js$/,
			loader: 'source-map-loader',
		}],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json', '/index.tsx', '/index.ts', '.jsx'],
		alias: {
			Components: path.resolve(__dirname, 'client/src/components'),
			Containers: path.resolve(__dirname, 'client/src/containers'),
			Mock: path.resolve(__dirname, 'client/src/mock'),
			Model: path.resolve(__dirname, 'client/src/model'),
			Reducers: path.resolve(__dirname, 'client/src/reducers'),
			Styles: path.resolve(__dirname, 'client/src/styles'),
			Actions: path.resolve(__dirname, 'client/src/actions'),
			Store: path.resolve(__dirname, 'client/src/store'),
		},
	},
	devServer: {
		historyApiFallback: true,
		open: 'chrome',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
		minimizer: [new UglifyJsPlugin()],
	},
};
