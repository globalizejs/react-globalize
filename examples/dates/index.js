/** @jsx React.DOM */

var ReactGlobalize = require('../../index');
var React = require('react');
var Globalize = require('globalize');
var FormatDate = ReactGlobalize.FormatDate;

Globalize.load(
    require( 'cldr-data/main/en/ca-gregorian' ),
    require( 'cldr-data/main/en/timeZoneNames' ),
    require( 'cldr-data/main/en/numbers' ),
    require( 'cldr-data/main/pt/ca-gregorian' ),
    require( 'cldr-data/main/pt/timeZoneNames' ),
    require( 'cldr-data/main/pt/numbers' ),
    require( 'cldr-data/supplemental/likelySubtags' ),
    require( 'cldr-data/supplemental/timeData' ),
    require( 'cldr-data/supplemental/weekData' )
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

React.render(
    <LocalizedDates />, document.getElementById('content')
);
