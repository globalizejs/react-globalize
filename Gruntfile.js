module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-esperanto");
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.loadNpmTasks("grunt-eslint");

    grunt.initConfig({
        esperanto: {
            amd: {
                options: {
                    type: "amd"
                },
                expand: true,
                cwd: "src",
                src : ["**.js", "!index.js"],
                dest: "dist/amd/"
            },
            cjs: {
                options: {
                    type: "cjs"
                },
                expand: true,
                cwd: "src",
                src : ["**.js"],
                dest: "dist/"
            }
        },
        mochaTest: {
            test: {
                options: {
                    colors: true,
                    require: ["babel-register", "./test/test_setup.js"]
                },
                src: ["test/**/*.js"]
            }
        },
        eslint: {
            target: ["Gruntfile.js", "test", "src"]
        }
    });

    grunt.registerTask("esperanto-cjs-cleanup", function() {
        grunt.file.expand("dist/**.js").map(function(filepath) {
            var newContent;
            var content = grunt.file.read(filepath);

            // Remove entries like /^require("globalize/currency");$/
            newContent = content.replace(/require\('globalize\/.*/g, "");
            if (content !== newContent) {
                grunt.file.write(filepath, newContent);
            }
        });
    });

    grunt.registerTask("build", ["esperanto", "esperanto-cjs-cleanup"]);
    grunt.registerTask("lint", ["eslint"]);
    grunt.registerTask("test", ["lint", "build", "mochaTest"]);
    grunt.registerTask("default", ["build"]);
};
