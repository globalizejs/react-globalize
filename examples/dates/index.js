/** @jsx React.DOM */

var ReactGlobalize = require('../../index');
var React = require('react');
var Globalize = require('globalize');

Globalize.load(
    require( 'cldr-data/json/main/en/ca-gregorian' ),
    require( 'cldr-data/json/main/en/timeZoneNames' ),
    require( 'cldr-data/json/main/en/numbers' ),
    require( 'cldr-data/json/main/pt-BR/ca-gregorian' ),
    require( 'cldr-data/json/main/pt-BR/timeZoneNames' ),
    require( 'cldr-data/json/main/pt-BR/numbers' ),
    require( 'cldr-data/json/supplemental/likelySubtags' ),
    require( 'cldr-data/json/supplemental/timeData' ),
    require( 'cldr-data/json/supplemental/weekData' )
);

var LocalizedDates = React.createClass({
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
                "GyMMMd" - <ReactGlobalize.FormatDate locale={this.state.locale} date={new Date()} pattern="GyMMMd" />
                <br/>
                date: "medium" - <ReactGlobalize.FormatDate locale={this.state.locale} date={new Date()} pattern={{ date: "medium" }} />
                <br/>
                time: "medium" - <ReactGlobalize.FormatDate locale={this.state.locale} date={new Date()} pattern={{ time: "medium" }} />
                <br/>
                datetime: "medium" - <ReactGlobalize.FormatDate locale={this.state.locale} date={new Date()} pattern={{ datetime: 'medium' }} />
            </div>
        );
    }
});

React.render(
    <LocalizedDates />, document.getElementById('content')
);
