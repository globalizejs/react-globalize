var webpack = require("webpack");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ReactGlobalizePlugin = require("react-globalize-webpack-plugin");
var nopt = require("nopt");

var jsLoaders = ["babel"];
var options = nopt({
    production: Boolean
});

module.exports = {
    entry: options.production ?  {
        main: "./index.jsx",
        vendor: ["react", "globalize"]
    } : "./index.jsx",
    debug: !options.production,
    output: {
        path: options.production ? "./dist" : "./tmp",
        publicPath: options.production ? "" : "http://localhost:8080/",
        filename: options.production ? "app.[hash].js" : "app.js",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: jsLoaders
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: options.production ? jsLoaders : ["react-hot"].concat(jsLoaders)
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
    },
    plugins: options.production ? [
        // Important to keep React file size down
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production"),
            },
        }),
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
            template: "./index-template.html",
            production: true,
        }),
        new ReactGlobalizePlugin({
            production: options.production,
            defaultLocale: "en"
        }),
        new CommonsChunkPlugin("vendor", "vendor.[hash].js")
    ] : [
        new HtmlWebpackPlugin({
            template: "./index-template.html",
        }),
        new ReactGlobalizePlugin({
            defaultLocale: "en"
        })
    ]
};
