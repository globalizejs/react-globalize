var Globalize = require("globalize");
var React = require("react");

var fns = {
    formatCurrency: ["value", "currency", "options"],
    formatDate: ["value", "options"],
    formatMessage: ["key", "variables"],
    formatNumber: ["value", "options"],
    formatRelativeTime: ["value", "unit", "options"]
};
var ReactGlobalize = {};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

Object.keys(fns).forEach(function(fn) {
    var Fn = capitalizeFirstLetter(fn);
    var argArray = fns[fn];

    ReactGlobalize[Fn] = React.createClass({
        displayName: Fn,
        render: function() {
            var formatted;
            var componentProps = this.props;
            var instance = Globalize;
            var propArgs = argArray.map(function(element) {
                return componentProps[element];
            });

            if (componentProps["locale"]) {
                instance = Globalize(componentProps["locale"]);
            }

            formatted = instance[fn].apply(instance, propArgs);

            return React.DOM.span(null, formatted);
        }
    });
});

module.exports = ReactGlobalize;
