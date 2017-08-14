module.exports = {
    entry: [
        "./index.js",
    ],
    output: {
        filename: "./app.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: require.resolve("babel-loader"),
            },
            {
                test: /\.(js|jsx)$/,
                include: /node_modules/,
                use: "imports-loader?define=>false",
            },
        ],
    },
};
