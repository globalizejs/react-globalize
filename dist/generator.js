'use strict';

var React = require('react');
var Globalize = require('globalize');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generator(fn, argArray, options) {
    var Fn = capitalizeFirstLetter(fn);
    options = options || {};
    var beforeFormat = options.beforeFormat || function() {};
    var afterFormat = options.afterFormat || function(formattedValue) {
        return formattedValue;
    }
    return {
        displayName: Fn,
        format: function() {
            return this.instance[fn].apply(this.instance, this.args);
        },
        render: function() {
            var formatted;
            var componentProps = this.props;
            this.instance = Globalize;
            this.args = argArray.map(function(element) {
                return componentProps[element];
            });

            // Get value from this.props.children.
            this.args[0] = this.props.children;

            if (this.props["locale"]) {
              this.instance = Globalize(this.props["locale"]);
            }

            beforeFormat.call(this);
            return React.DOM.span(null, afterFormat.call(this, this.format()));
        }
    }
};

module.exports = generator;