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
                presets: [ "@babel/preset-react", [ "@babel/preset-env", { modules: false } ] ],
                plugins: [ "@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-object-rest-spread" ],
                exclude: "node_modules/**"
            })
        ]
    }
];
