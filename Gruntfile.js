module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-esperanto");

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
    grunt.registerTask("default", ["build"]);
};
