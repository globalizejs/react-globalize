var React = require("react");
var Globalize = require("globalize");
var GlobalizeCompiler = require("globalize/tool/compiler");

function compiler() {
    var components = [].slice.call(arguments, 0);

    // Have react to render all passed components, therefore any formatters in use will be created.
    components.forEach(function(component) {
        React.renderToString(component);
    });

    // Compile all generated formatters.
    return GlobalizeCompiler(Globalize.cache);
}

module.exports = compiler;
