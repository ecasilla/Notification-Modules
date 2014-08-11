var path = require('path');

module.exports = function (grunt) {
	'use strict';

	//project Config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files: ['app/scripts/**/*.js',
				'test/**/*.js',
				'!test/helpers/*.js',
				'!app/scripts/bundle.js',
				'!test/browserified.js'
			],
			options: {
				jshintrc: '.jshintrc',
				ignores: 'app/scripts/bundle.js',
				reporter: require('jshint-stylish')
			}
		},

		browserify: {
			options: {
				debug: true
			},
			dev: {
				files: {
					'dist/scripts/bundle.js': ['app/scripts/main.js']
				},
				options: {
					external: [
						'app/scripts/vendor/classie.js'
					],
					preBundle: function (b) {
						b.plugin(remapify, [{
							src: 'app/scripts/**/*.js',
							expose: 'scripts'
						}])
					}
				}
			},
			vendor: {
				src: ['app/vendor/**/*.js'],
				dest: 'dest/vendor/**/*.js',
				options: {
					alias: [
						'../vendor/classie.js:classie',
						'../vendor/jQuery.min.js:jQuery'
					],
					external: null
				}
			},
			test: {
				files: {
					'test/browserified.js': ['test/unit/**/*.js'],
				}
			}
		},

		uglify: {
			options: {
				sourceMap: true,
				compress: {
					drop_console: true
				}
			},
			production: {
				files: {
					'dist/scripts/bundle.min.js': ['dist/scripts/bundle.js']
				}
			}
		},
		jsbeautifier: {
			files: ["app/**/*.js",
				"app/**/*.css",
				"app/**/*.html",
				"app/**/*.ejs",
				"app/**/*.jade",
				"Gruntfile.js",
				"!app/**/*.less",
				"!app/scripts/bundle.*"
			],
			options: {
				config: '.jsbeautify'
			},

		},

		less: {
			production: {
				options: {
					paths: ["./app/styles/*.less"],
					cleancss: true,
					sourceMap: true,
					yuicompress: true,
					compress: true,
				},
				files: {
					"./dist/styles/main.min.css": "./app/styles/*.less"
				}
			}
		},
		template: {
			dev: {
				files: [{
					expand: true,
					cwd: 'app/views',
					src: ['**/*.ejs',
						'**/*.jade',
						'index.ejs',
						'index.jade',
						'!**/_*.ejs',
						'!**/_*.jade'
					],
					dest: 'dist/',
					ext: '.html'
				}],
				variables: {
					env: grunt.file.readJSON('environment.json').dev
				}
			},
			production: {
				files: ['<%= template.dev.files %>'],
				variables: {
					env: grunt.file.readJSON('environment.json').production
				}
			}
		},

		copy: {
			vendor_fonts: {
				files: [
					// includes files within path
					{
						expand: true,
						cwd: 'app/vendor/',
						src: ['**/*'],
						dest: 'dist/vendor/'
					}, {
						expand: true,
						cwd: 'app/fonts/',
						src: ['**/*'],
						dest: 'dist/fonts/'
					}
				]
			},
			spec: {
				expand: true,
				cwd: 'app/scripts',
				nonull: true,
				src: ['**/*.js', '!bundle.js'],
				dest: 'test/unit/',
				filter: function (filepath) { //look in test/unit to see if spec already exists. Return TRUE to make new file	(files does not exist)
					var dest = path.join(
						grunt.config('copy.spec.dest'),
						path.basename(filepath, '.js') + '_spec.js'
					);
					var doesFileExist = grunt.file.exists(dest);
					return !(doesFileExist);
				},
				rename: function (dest, src) {
					var src_spec = path.basename(src, '.js') + "_spec.js"
					return dest + src_spec;
				},
				options: {
					process: function (content, srcpath) { //between copy
						console.log("STARTING Replace", " ", srcpath);
						var varName = path.basename(srcpath, '.js');
						var require = "var " + varName + " = " + "require('" + '../../' + srcpath + "');";
						return require;
					}
				}
			}
		},

		plato: {
			lint: {
				options: {
					jshint: grunt.file.readJSON('.jshintrc'),
					dir: "reports",
					title: grunt.file.readJSON('package.json').name,
					complexity: {
						minmi: true,
						forin: true,
						logicalor: false
					}
				},
				files: {
					'reports': ['app/scripts/**/*.js']
				}
			},
		},
		mocha_istanbul: {
			coverage: {
				src: 'test/unit',
				options: {
					check: {
						lines: 75,
						statements: 75,
						branches: 75,
						functions: 75
					},
					mask: '*.js',
					instrument: ['test'],
					coverageFolder: "reports/coverage",
					reporter: "html-cov",
					ui: 'bdd',
					root: 'app/scripts/',
					print: 'summary',
					excludes: ['node_modules', 'dist']
				}
			}
		},

		casperjs: {
			options: {
				async: {
					parrallel: true
				}
			},
			files: {
				src: ['test/intergration/**/*.js']
			}
		},

		connect: {
			server: {
				options: {
					port: 8181,
					hostname: 'localhost',
					base: 'dist'
				}
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: ['app/views/**/*'],
				tasks: ['template:dev']
			},
			css: {
				files: '<%= less.production.options.paths %>',
				tasks: ['newer:less'],
			},
			jshint: {
				files: '<%= jshint.files %>',
				tasks: ['newer:jshint']
			},
			browserify: {
				files: ['app/scripts/*.js', 'test/unit/**/*.js'],
				tasks: ['browserify', 'browserify:vendor', 'uglify']
			},
			copySpec: {
				files: ['app/scripts/**/*.js'],
				tasks: ['copy:spec'],
				options: {
					event: ['added']
				}
			},
			copy: {
				files: ['app/vendor/**/*.*', 'app/fonts/**/*.*'],
				tasks: ['newer:copy:vendor_fonts']
			},
			jsbeautifier: {
				files: '<%= jsbeautifier.files %>',
				tasks: ['newer:jsbeautifier']
			}
		},

		concurrent: {
			target1: ['watch', 'copy'],
			target2: ['casperjs'],
			options: {
				logConcurrentOutput: true
			}
		}


	}); //Grunt init



	// Loading dependencies
	for (var key in grunt.file.readJSON("package.json").devDependencies) {
		if (key.indexOf("grunt") === 0 && key !== "grunt") {
			grunt.loadNpmTasks(key);
		}
	}

	require('time-grunt')(grunt);

	// grunt.registerTask('default', ['connect', 'concurrent:target1']);
	grunt.registerTask('default', ['connect', 'watch']);
	grunt.registerTask('test', ['newer:browserify:test']);
	grunt.registerTask('coverage', ['mocha_istanbul', "plato"]);
	grunt.registerTask('teste2e', ['concurrent:target2']);
	grunt.registerTask('prod', ['jshint', 'uglify', 'less:production', 'template:production', 'copy', 'connect:server:keepalive']);

}; //grunt exports
