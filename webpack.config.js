const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
	},
	devServer: {
		port: 4200
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.join(__dirname, 'src/index.html')
		}),
	]
}
