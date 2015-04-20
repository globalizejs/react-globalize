var Globalize = require("globalize");
var React = require("react");
var ReactGlobalize = {};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

Object.getOwnPropertyNames(Globalize).forEach(function(fn) {
    if (fn.indexOf("format") === 0) {
        var Fn = capitalizeFirstLetter(fn);
        var fnString = Globalize[fn].toString();
        var argString = fnString.substr(fnString.indexOf("(")+1, fnString.indexOf(")")-(fnString.indexOf("(")+1)).trim();
        var argArray = argString.split(", ");

        ReactGlobalize[Fn] = React.createClass({
            displayName: Fn,
            render: function() {
                var formatted;
                var componentProps = this.props;
                var instance = Globalize;
                var propArgs = argArray.map(function(element) {
                    return componentProps[element.replace(/(\s\/\*|\*\/)/,"").trim()];
                });

                if (componentProps["locale"]) {
                  instance = Globalize(componentProps["locale"]);
                }

                formatted = instance[fn].apply(instance, propArgs);

                return React.DOM.span(null, formatted);
            }
        });
    }
});

module.exports = ReactGlobalize;
