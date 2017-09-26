import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import pkg from "./package.json";

export default [
    // browser-friendly UMD build
    {
        input: "src/index.js",
        external: [
            "react",
            "globalize",
            "prop-types",
        ],
        globals: {
            react: "React",
            globalize: "Globalize",
            "prop-types": "PropTypes",
        },
        output: [
            { file: pkg.browser, format: "umd", name: "react-globalize" },
            { file: pkg.main, format: "cjs" },
            { file: pkg.module, format: "es" },
        ],
        plugins: [
            resolve(),
            babel({
                exclude: "node_modules/**",
            }),
        ],
    },
];
