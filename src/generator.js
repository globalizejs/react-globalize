import React from "react";
import Globalize from "globalize";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generator(fn, argArray, options) {
    var Fn = capitalizeFirstLetter(fn);
    options = options || {};
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

            if (this.props["locale"]) {
              this.instance = Globalize(this.props["locale"]);
            }

            return React.DOM.span(null, this.format());
        }
    }
};

export default generator;
