// <reference types="webpack-env" />
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: ['react', 'react-dom', './client/src/index.tsx'],
	devtool: 'inline-source-map',
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'client/distr'),
		publicPath: ' ',
	},
	plugins: [
		new CleanWebpackPlugin(['./client/distr', './client/dist']),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'client/src/index.html'),
			filename: 'index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
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
			test: /\.svg$/, loader: 'babel?presets[]=es2015,presets[]=react!svg-react'
		},
		{
			test: /\.(gif|jpg|png|ico)(\?\S*)?$/,
			use: ['url-loader'],
		},
		{ test: /\.(js|jsx|mjs)$/, loader: 'babel-loader', exclude: /node_modules/ },
		{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
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
};
