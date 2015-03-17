var Globalize = require('globalize');
var mixins = {};

Object.getOwnPropertyNames(Globalize).forEach(function(fn) {
    if (fn.indexOf("format") === 0) {
        var fnString = Globalize[fn].toString();
        var argString = fnString.substr(fnString.indexOf('(')+1, fnString.indexOf(')')-(fnString.indexOf('(')+1)).trim();
        var argArray = argString.split(', ');

        (function(currentFn, currentArgs) {
            var formatter = function(nextProps) {
                var componentProps = nextProps || this.props;
                var propArgs = currentArgs.map(function(element) {
                        return componentProps[element.replace(/(\s\/\*|\*\/)/,'')];
                    });

                Globalize.locale( componentProps["locale"] );
                this.setState({
                    formattedValue: Globalize[currentFn].apply(Globalize, propArgs)
                });
            };

            mixins[currentFn] = {
                componentWillMount: formatter,
                componentWillReceiveProps: formatter
            };
        })(fn, argArray);
    }
});
module.exports = mixins;
