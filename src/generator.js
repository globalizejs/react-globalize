import React from "react";
import Globalize from "globalize";

var commonPropNames = ["elements", "locale"];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function omit(set) {
    return function(element) {
        return set.indexOf(element) === -1;
    };
}

function generator(fn, localPropNames, options) {
    options = options || {};
    var Fn = capitalizeFirstLetter(fn);
    var beforeFormat = options.beforeFormat || function() {};
    var afterFormat = options.afterFormat || function(formattedValue) {
        return formattedValue;
    };
    var globalizePropNames = commonPropNames.concat(localPropNames);

    return class extends React.Component {
        // static displayName = Fn;

        componentWillMount() {
            this.setup(this.props);
        }

        componentWillReceiveProps(nextProps) {
            this.setup(nextProps);
        }

        setup(props) {
            this.globalize = props.locale ? Globalize(props.locale) : Globalize;
            this.domProps = Object.keys(props).filter(omit(globalizePropNames)).reduce(function(memo, propKey) {
                memo[propKey] = props[propKey];
                return memo;
            }, {});

            this.globalizePropValues = localPropNames.map(function(element) {
                return props[element];
            });
            this.globalizePropValues[0] = props.children;

            beforeFormat.call(this, props);
            var formattedValue = this.globalize[fn].apply(this.globalize, this.globalizePropValues);
            this.value = afterFormat.call(this, formattedValue);
        }

        render() {
            return React.createElement("span", this.domProps, ...this.value);
        }
    };
}

export default generator;
