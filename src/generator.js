import React from "react";
import Globalize from "globalize";

const commonPropNames = ["elements", "locale"];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function omit(set) {
    return function omitElem(element) {
        return set.indexOf(element) === -1;
    };
}

function generator(fn, localPropNames, options) {
    const opts = options || {};
    const Fn = capitalizeFirstLetter(fn);
    const beforeFormat = opts.beforeFormat || (() => {});
    const afterFormat = opts.afterFormat || (formattedValue => formattedValue);
    const globalizePropNames = commonPropNames.concat(localPropNames);

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
            this.domProps = Object.keys(props)
                .filter(omit(globalizePropNames))
                .reduce((memo, propKey) => ({ ...memo, [propKey]: props[propKey] }), {});

            this.globalizePropValues = localPropNames.map(element => props[element]);
            this.globalizePropValues[0] = props.children;

            beforeFormat.call(this, props);
            const formattedValue = this.globalize[fn](...this.globalizePropValues);
            this.value = afterFormat.call(this, formattedValue);
        }

        render() {
            return React.createElement("span", this.domProps, ...this.value);
        }
    };
}

export default generator;
