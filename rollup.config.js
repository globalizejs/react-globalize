import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import pkg from "./package.json";

export default [
    // browser-friendly UMD build
    {
        entry: "src/index.js",
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
        targets: [
            { dest: pkg.browser, format: "umd", moduleName: "react-globalize" },
            { dest: pkg.main, format: "cjs" },
            { dest: pkg.module, format: "es" },
        ],
        plugins: [
            resolve(),
            babel({
                exclude: "node_modules/**",
            }),
        ],
    },
];
