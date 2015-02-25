/** @jsx React.DOM */

var ReactGlobalize = require('../../index');
var React = require('react');
var Globalize = require('globalize');
var FormatDate = ReactGlobalize.FormatDate;

module.exports.LocalizedDates = React.createClass({
    getInitialState: function() {
        return {
            locale: "en"
        };
    },
    handleChange: function( event ) {
        this.setState({
            locale: event.target.value
        });
    },
    render: function() {
        return (
            <div>
                <div>
                    Select a locale:
                    <select onChange={this.handleChange}>
                        <option value="en">en</option>
                        <option value="pt-BR">pt-BR</option>
                    </select>
                </div>
                <br/>
                "GyMMMd" - <FormatDate locale={this.state.locale} date={new Date()} pattern="GyMMMd" />
                <br/>
                date: "medium" - <FormatDate locale={this.state.locale} date={new Date()} pattern={{ date: "medium" }} />
                <br/>
                time: "medium" - <FormatDate locale={this.state.locale} date={new Date()} pattern={{ time: "medium" }} />
                <br/>
                datetime: "medium" - <FormatDate locale={this.state.locale} date={new Date()} pattern={{ datetime: 'medium' }} />
            </div>
        );
    }
});
