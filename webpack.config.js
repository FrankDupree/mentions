const path = require('path');


module.exports ={

	entry:{
		app: ['babel-polyfill','./index.js']
	},

	output:{
		path: path.resolve(__dirname, 'dist/src'),
		filename: 'Mentions.js',
		libraryTarget: 'umd',
		library:'Mentions',
	},

	devtool: 'source-map',

	module:{

		rules:[
		  {
		  	test:/\.js$/, 
		  	exclude:[
				path.resolve(__dirname, "node_modules") 
		  	],
		  		loader:"babel-loader", 
				options: {
					 presets: ['env', 'stage-0']
				}
		  }
		]
	}

	
}