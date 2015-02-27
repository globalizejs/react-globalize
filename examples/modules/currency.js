var ReactGlobalize = require('../react-globalize');
var React = require('react');
var Globalize = require('globalize');
var FormatCurrency = ReactGlobalize.FormatCurrency;

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
                USD, 150, locale default - <FormatCurrency locale={this.state.locale} currency="USD" amount={150} />
                <br/>
                USD, -150, style: "accounting" - <FormatCurrency locale={this.state.locale} currency="USD" amount={-150} options={{ style: "accounting" }} />
                <br/>
                USD, 150, style: "name" - <FormatCurrency locale={this.state.locale} currency="USD" amount={150} options={{ style: "name" }} />
                <br/>
                USD, 150, style: "code" - <FormatCurrency locale={this.state.locale} currency="USD" amount={150} options={{ style: "code" }} />
                <br/>
                USD, 1.491, round: "ceil" - <FormatCurrency locale={this.state.locale} currency="USD" amount={1.491} options={{ round: "ceil" }} />
                <br/>
                EUR, 150, locale default - <FormatCurrency locale={this.state.locale} currency="EUR" amount={150} />
                <br/>
                EUR, -150, style: "accounting" - <FormatCurrency locale={this.state.locale} currency="EUR" amount={-150} options={{ style: "accounting" }} />
                <br/>
                EUR, 150, style: "name" - <FormatCurrency locale={this.state.locale} currency="EUR" amount={150} options={{ style: "name" }} />
                <br/>
                EUR, 150, style: "code" - <FormatCurrency locale={this.state.locale} currency="EUR" amount={150} options={{ style: "code" }} />
                <br/>
                EUR, 1.491, round: "ceil" - <FormatCurrency locale={this.state.locale} currency="EUR" amount={1.491} options={{ round: "ceil" }} />
            </div>
        );
    }
});
