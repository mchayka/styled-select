var f = require('util').format,
    files = [
      'src/css.js',
      'src/html.js',
      'src/select.js',
      'src/plugin.js'
      ];


module.exports = function(grunt) {
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    version: grunt.file.readJSON('package.json').version,

    buildDir: 'dist',

    banner: [
      '/*!',
      ' * styled-select.js <%= version %>',
      ' * https://github.com/mchayka/styled-select',
      ' * Copyright 2015-<%= grunt.template.today("yyyy") %> Mike Chayka; Licensed MIT',
      ' */\n\n'
    ].join('\n'),

    uglify: {
      options: {
        banner: '<%= banner %>',
        enclose: { 'window.jQuery': '$' }
      },
      styledSelect: {
        options: {
          mangle: false,
          beautify: true,
          compress: false
        },
        src: files,
        dest: '<%= buildDir %>/styled-select.jquery.js'

      },
      styledSelectMin: {
        options: {
          mangle: true,
          compress: true
        },
        src: files,
        dest: '<%= buildDir %>/styled-select.jquery.min.js'

      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: 'src/**/*.js',
      gruntfile: ['Gruntfile.js']
    },

    watch: {
      js: {
        files: 'src/**/*',
        tasks: 'build'
      }
    },

    clean: {
      dist: 'dist'
    },

    connect: {
      server: {
        options: { port: 8887, keepalive: true }
      }
    },

    concurrent: {
      options: { logConcurrentOutput: true },
      dev: ['server', 'watch']
    }

  });


  // aliases
  // -------

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('server', 'connect:server');
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('dev', 'concurrent:dev');
};
