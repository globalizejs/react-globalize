/** @jsx React.DOM */

var React = require('react');
var Globalize = require('globalize');

var globalizations = [
    {formatCurrency: ["amount","currency","options"]},
    {formatDate: ["date","pattern"]},
    {formatNumber: ["number","options"]}
];

globalizations.forEach(function(globalization) {
    var fn = Object.keys(globalization)[0],
        params = globalization[fn];

    (function(currentFn, currentParams) {
        module.exports[currentFn.charAt(0).toUpperCase() + currentFn.slice(1)] = React.createClass({
            currentParams: currentParams,
            render: function() {
                var that = this;
                var propParams = this.currentParams.map(function(element) {
                        return that.props[element];
                    });
                // set locale
                Globalize.locale( this.props.locale );

                return (
                    <span>{Globalize[currentFn].apply(Globalize, propParams)}</span>
                );
            }
        });
    })(fn, params);
});
