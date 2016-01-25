module.exports = function(grunt) {

    var package = grunt.file.readJSON('package.json');

    var qunitTests = [
        'base', 'single-select', 'multi-select'
    ].map(function(test) {
	return 'http://127.0.0.1:9998/test/' + test + '/index.html';
    });

    grunt.initConfig({
        pkg: package,
        jshint: {
	    options: {
		jshintrc: true
	    },
	    grunt: 'Gruntfile.js',
	    source: 'src/tableselect.js',
	    tests: ['test/**/*.js']
	},
        connect: {
	    server: {
		options: {port: 9998, base: ['.']}
	    }
        },
        qunit: {
	    all: {
		options: {urls: qunitTests}
	    }
	}
    });

    // Loading dependencies
    for (var key in package.devDependencies)
	if (key !== 'grunt' && key.indexOf('grunt') === 0)
	    grunt.loadNpmTasks(key);

    // tasks
    grunt.registerTask('test', ['jshint', 'connect:server', 'qunit']);
};
