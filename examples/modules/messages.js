/** @jsx React.DOM */

var ReactGlobalize = require('../../index');
var React = require('react');
var Globalize = require('globalize');
var FormatMessage = ReactGlobalize.FormatMessage;

module.exports.LocalizedMessages = React.createClass({
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
                <h3>Simple Salutation</h3>
                hi - <FormatMessage locale={this.state.locale} path="salutations/hi" />
                <br/>
                bye - <FormatMessage locale={this.state.locale} path="salutations/bye" />
                <h3>Variable Replacement</h3>
                ["Wolfgang", "Amadeus", "Mozart"] - <FormatMessage locale={this.state.locale} path="variables/hello" variables={["Wolfgang", "Amadeus", "Mozart"]} />
                <br/>
                {JSON.stringify({first:"Wolfgang", middle:"Amadeus", last:"Mozart"})} - <FormatMessage locale={this.state.locale} path="variables/hey" variables={{first:"Wolfgang", middle:"Amadeus", last:"Mozart"}} />
                <h3>Gender Inflection</h3>
                {JSON.stringify({guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"male"})} - <FormatMessage locale={this.state.locale} path="party" variables={{guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"male"}} />
                <br/>
                {JSON.stringify({guest:"Mozart", guestGender:"male", host:"Mendelssohn", hostGender:"female"})} - <FormatMessage locale={this.state.locale} path="party" variables={{guest:"Mozart", guestGender:"male", host:"Mendelssohn", hostGender:"female"}} />
                <br/>
                {JSON.stringify({guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"other"})} - <FormatMessage locale={this.state.locale} path="party" variables={{guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"other"}} />
                <br/>
                {JSON.stringify({guest:"Mozart", guestGender:"other", host:"Beethoven", hostGender:"male"})} - <FormatMessage locale={this.state.locale} path="party" variables={{guest:"Mozart", guestGender:"other", host:"Mendelssohn", hostGender:"female"}} />
                <br/>
                {JSON.stringify({guest:"Mozart", guestGender:"other", host:"Beethoven", hostGender:"other"})} - <FormatMessage locale={this.state.locale} path="party" variables={{guest:"Mozart", guestGender:"other", host:"Beethoven", hostGender:"other"}} />
                <h3>Plural Inflection</h3>
                task count 1 - <FormatMessage locale={this.state.locale} path="task" variables={{count: 1}} />
                <br/>
                task count 0 - <FormatMessage locale={this.state.locale} path="task" variables={{count: 0}} />
                <br/>
                task count 1000 formatted - <FormatMessage ref="formattedTask" locale={this.state.locale} path="task" variables={{count: 1000, formattedCount: Globalize(this.state.locale).formatNumber(1000)}} />
                <br/>
                like count 0 with offset:1 - <FormatMessage locale={this.state.locale} path="likeIncludingMe" variables={{count: 0}} />
                <br/>
                like count 1 with offset:1 - <FormatMessage locale={this.state.locale} path="likeIncludingMe" variables={{count: 1}} />
                <br/>
                like count 2 with offset:1 - <FormatMessage locale={this.state.locale} path="likeIncludingMe" variables={{count: 2}} />
                <br/>
                like count 3 with offset:1 - <FormatMessage locale={this.state.locale} path="likeIncludingMe" variables={{count: 3}} />
            </div>
        );
    }
});
