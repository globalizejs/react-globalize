'use strict';

var reactCreateClass = require('./react-create-class');
var React = require('react');
var Globalize = require('globalize');

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

    return reactCreateClass({
        displayName: Fn,
        componentWillMount: function() {
            this.setup(this.props);
        },
        componentWillReceiveProps: function(nextProps) {
            this.setup(nextProps);
        },
        setup: function(props) {
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
        },
        render: function() {
            return React.DOM.span(this.domProps, this.value);
        }
    });
}

module.exports = generator;