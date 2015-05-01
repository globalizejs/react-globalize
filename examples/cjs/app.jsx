var React = require("react");
var Globalize = require("globalize");
var LocalizedCurrencies = require("./components/currency");
var LocalizedDates = require("./components/dates");
var LocalizedMessages = require("./components/messages");
var LocalizedNumbers = require("./components/numbers");

var App = React.createClass({
    getInitialState: function() {
        return {
            locale: this.props.locale
        };
    },
    changeLocale: function( event ) {
        this.setState({
            locale: event.target.value
        });
    },
    render: function() {
        Globalize.locale(this.state.locale);
        return (
            <div>
                <h1>Select a locale:</h1>
                <select onChange={this.changeLocale}>
                    <option value="en">en-US</option>
                    <option value="pt">pt-BR</option>
                </select>

                <h1>Currency</h1>
                <LocalizedCurrencies />

                <h1>Dates</h1>
                <LocalizedDates />

                <h1>Messages</h1>
                <LocalizedMessages />

                <h1>Numbers</h1>
                <LocalizedNumbers />
            </div>
        );
    }
});

module.exports = App;
