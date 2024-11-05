/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
module.exports = (config, pkg, options, mode) => {
	// eslint-disable-next-line no-param-reassign
	config.resolve.alias['app-entrypoint'] = `${__dirname}/src/app.tsx`;
	config.module.rules.push({
		test: /\.(graphql|gql)$/,
		exclude: /node_modules/,
		loader: 'graphql-tag/loader'
	});

	// Add Tailwind CSS configuration
	config.module.rules.push({
		test: /\.css$/,
		use: [
			'style-loader',
			'css-loader',
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					postcssOptions: {
						plugins: [require('tailwindcss'), require('autoprefixer')]
					}
				}
			}
		]
	});

	return config;
};
