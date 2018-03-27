import React from "react";
import Globalize from "globalize";
import alwaysArray from "./util/always-array";

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
    var afterFormat = options.afterFormat || function(props, formattedValue) {
        return formattedValue;
    };
    var globalizePropNames = commonPropNames.concat(localPropNames);

    return class extends React.Component {
        static displayName = Fn;

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
            var formattedValue = this.globalize[fn](...this.globalizePropValues);
            this.value = alwaysArray(afterFormat.call(this, props, formattedValue));
        }

        render() {
            return React.createElement("span", this.domProps, ...this.value);
        }
    };
}

export default generator;
