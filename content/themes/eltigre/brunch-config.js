module.exports = {
	npm: {
		compilers: ['babel-brunch']
	},
	files: {
		javascripts: {
			joinTo: {
				'assets/js/app-bundle.js': /^(dev\/js\/.*\.js)/,
				'assets/js/vendor.js': /node_modules/
			},
		},
		stylesheets: { joinTo: 'assets/styles/style.css' }
	},
	paths: {
		public: '',
		watched: ['dev']
	},
	plugins: {
		browserSync: {
			files: ["*.php"]
		},
		sass: {
			options: {
				includePaths: ['node_modules/susy/sass']
			}
		},
		autoReload: { enabled: true }
	},
	// Disable CommonJS modules
	modules: {
		wrapper: (path, data) => {
			return `
			require.define({'${path}': function(exports, require, module) {
				${data}
			}});\n\n
		  `
		},
		autoRequire: {
			"assets/js/app-bundle.js": ["dev/js/App.js"]
		}
	},
	watcher: {
		awaitWriteFinish: true,
		usePolling: true
	},
}