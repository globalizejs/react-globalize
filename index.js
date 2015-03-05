var React = require('react');
var Globalize = require('globalize');

Object.getOwnPropertyNames(Globalize).forEach(function(fn) {
    if (fn.indexOf("format") === 0) {
        var fnString = Globalize[fn].toString(),
            argString = fnString.substr(fnString.indexOf('(')+1, fnString.indexOf(')')-(fnString.indexOf('(')+1)).trim(),
            argArray = argString.split(', ');

        (function(currentFn, currentArgs) {
            module.exports[currentFn.charAt(0).toUpperCase() + currentFn.slice(1)] = React.createClass({
                currentArgs: currentArgs,
                render: function() {
                    var that = this;
                    var propArgs = this.currentArgs.map(function(element) {
                            return that.props[element.replace(/(\s\/\*|\*\/)/,'')];
                        });

                    // set locale
                    Globalize.locale( this.props.locale );

                    return (
                        React.createElement("span", null, Globalize[currentFn].apply(Globalize, propArgs))
                    );
                }
            });
        })(fn, argArray);
    }
});
