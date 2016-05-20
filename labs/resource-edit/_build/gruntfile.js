module.exports = function(grunt) {
  var webpackConfig = require('./webpack.config.js');
  grunt.initConfig({
    dirs:{
      theme:'../',
      lib:'./lib/',
      assets:'assets/',
      js:'./js/',
      css:'./css/',
      scss:'./scss/'
    },
    bower: {
        install: {
            options: {
                targetDir: './lib',
                layout: 'byComponent'
            }
        }
    },
    copy: {
      misc: {
        files: [{
            src: 'bourbon/**/*',
            cwd: '<%= dirs.lib %>',
            dest: '<%= dirs.scss %>',
            expand: true
        }, {
            src: 'neat/**/*',
            cwd: '<%= dirs.lib %>',
            dest: '<%= dirs.scss %>',
            expand: true
        }]
      }
    },
    sass:{
      dev: {
				options: {
					style: 'expanded',
					compass: false,
          sourcemap: false
				},
				files: {
					'<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css': '<%= dirs.scss %>main.scss'
				}
			}
    },
    cssmin:{
      ship: {
        options:{
          report:'gzip'
        },
        files: {
            '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.min.css': '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css'
        }
      },
    },
    webpack:{
      options:webpackConfig,
      dist:{

      }
    },
    uglify: {
      js: {
        options:{report:"gzip"},
        files: {
          '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>app.min.js': '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>app.js'
        }
      }
    },
    growl: { /* optional growl notifications requires terminal-notifer: gem install terminal-notifier */
      sass: {
          message: "Sass files created.",
          title: "grunt"
      },
      build: {
          title: "grunt",
          message: "Build complete."
      },
      watch: {
          title: "grunt",
          message: "Watching. Grunt has its eye on you."
      },
      concat: {
          title: "grunt",
          message: "JavaScript concatenated."
      },
      uglify: {
          title: "grunt",
          message: "JavaScript minified."
      }
    },
    watch: { /* trigger tasks on save */
      options: {
          livereload: true
      },
      scss: {
          options: {
              livereload: false
          },
          files: '<%= dirs.scss %>**/*.scss',
          tasks: ['sass:dev', 'growl:sass']
      },
      js: {
          files: ['<%= dirs.js %>**/*.js'],
          tasks: ['webpack','uglify', 'growl:uglify']
      }
    },
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('build',['bower','copy','webpack','uglify','sass','growl:build']);
};
