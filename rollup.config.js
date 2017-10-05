import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import pkg from "./package.json";

export default [
    {
        input: "src/index.js",
        external: [
            "react",
            "globalize",
            "globalize/*"
        ],
        globals: {
            react: "React",
            globalize: "Globalize"
        },
        output: [
            { file: pkg.browser, format: "umd", name: "react-globalize" },
            { file: pkg.main, format: "cjs" },
            { file: pkg.module, format: "es" }
        ],
        plugins: [
            resolve(),
            babel({
                babelrc: false,
                presets: [ "react", [ "env", { modules: false } ] ],
                plugins: [ "transform-class-properties", "transform-object-rest-spread" ],
                exclude: "node_modules/**"
            })
        ]
    }
];
