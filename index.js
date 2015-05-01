(function(root, factory) {

    // UMD returnExports
    if (typeof define === "function" && define.amd) {
        // AMD
        define([
            "globalize",
            "react",
            "globalize/currency",
            "globalize/date",
            "globalize/message",
            "globalize/number",
            "globalize/plural",
            "globalize/relative-time"
        ], factory );
    } else if ( typeof exports === "object" ) {
        // Node, CommonJS
        module.exports = factory(require("globalize"), require("react"));
    } else {
        // Global
        root.ReactGlobalize = factory(root.Global, root.React);
    }
}(this, function(Globalize, React) {

var ReactGlobalize = {};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isPlainObject(value) {
    return value && typeof value === "object" &&
        !(value.constructor &&
        !value.constructor.prototype.hasOwnProperty("isPrototypeOf")) &&
        !React.isValidElement(value);
}

function supportReactElements(value) {
    if (isPlainObject(value)) {
        return Object.keys(value).reduce(function(sum, i) {
            sum[i] = supportReactElements(value[i]);
            return sum;
        }, {});
    } else if (React.isValidElement(value)) {
        value = new ReactGlobalize[value.type.displayName](value._store.props).render()._store.props.children;
    }
    return value;
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
                }).map(supportReactElements);

                if (componentProps["locale"]) {
                  instance = Globalize(componentProps["locale"]);
                }

                formatted = instance[fn].apply(instance, propArgs);

                return React.DOM.span(null, formatted);
            }
        });
    }
});

return ReactGlobalize;

}));
