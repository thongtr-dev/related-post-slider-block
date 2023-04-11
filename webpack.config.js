const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const webpack = require("webpack");

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry,
		index: "./src/index.tsx",
		frontend: "./src/frontend.tsx",
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				// Notice that this regex matches both `.ts` and `.tsx`
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							// You can specify any custom config
							configFile: "tsconfig.json",

							// See note under "issues" for details
							// Speeds up by skipping type-checking. You can still use TSC for that.
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [
			".ts",
			".tsx",
			...(defaultConfig.resolve
				? defaultConfig.resolve.extensions || [".js", ".jsx"]
				: []),
		],
	},
	plugins: [
		...defaultConfig.plugins,
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		}),
	],
};
