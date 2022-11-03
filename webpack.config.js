const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const webpack = require("webpack");

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry,
		frontend: "./src/frontend.js",
	},
	plugins: [
		...defaultConfig.plugins,
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		}),
	],
};
