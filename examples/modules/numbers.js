var ReactGlobalize = require('../react-globalize');
var React = require('react');
var Globalize = require('globalize');
var FormatNumber = ReactGlobalize.FormatNumber;

module.exports = React.createClass({
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
                pi, no options - <FormatNumber locale={this.state.locale} value={Math.PI} />
                <br/>
                pi, maximumFractionDigits: 5 - <FormatNumber locale={this.state.locale} value={Math.PI} options={{ maximumFractionDigits: 5 }} />
                <br/>
                pi, round: 'floor' - <FormatNumber locale={this.state.locale} value={Math.PI} options={{ round: 'floor' }} />
                <br/>
                10000, minimumFractionDigits: 2 - <FormatNumber locale={this.state.locale} value={10000} options={{ minimumFractionDigits: 2 }} />
                <br/>
                0.5, style: 'percent' - <FormatNumber locale={this.state.locale} value={0.5} options={{ style: 'percent' }} />
            </div>
        );
    }
});
