const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const LicensePlugin = require("license-webpack-plugin").LicenseWebpackPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const fs = require("fs");

module.exports = {
	entry: loadEntries("./src/public"),
	output: {
		path: path.resolve(__dirname, "build/public"),
		filename: "./js/[name].js"
	},
	module: {
		rules: [{
				test: /\.(tsx|ts)$/,
				use: "ts-loader"
			},
			{
				test: /\.(js)$/,
				use: "babel-loader"
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	mode: "production",
	plugins: [
		new CopyPlugin({
			patterns: [{
					from: "./src/public",
					to: ".",
					globOptions: {
						ignore: ["**/*.tsx", "**/*.ts"]
					}
				}
			],
		}),
		new LicensePlugin({
			outputFilename: 'third-party-notice.txt'
		})
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false,
					},
				},
				extractComments: false,
			}),
		],
	},
	//devtool: "source-map"
};

function loadEntries(dir) {
	let files = fs.readdirSync(path.join(__dirname, dir));
	let entries = {};
	files.forEach(file => {
		let name = file.match(/^(.*)\.tsx$/);
		if (name) {
			entries[name[1]] = path.join(__dirname, dir, file);
		}
	});
	return entries;
}