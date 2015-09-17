var FormatCurrency = require('../react-globalize').FormatCurrency;
var React = require('react');

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
                USD, 150, locale default - <FormatCurrency locale={this.state.locale} currency="USD">{150}</FormatCurrency>
                <br/>
                USD, -150, style: "accounting" - <FormatCurrency locale={this.state.locale} currency="USD" options={{ style: "accounting" }}>{-150}</FormatCurrency>
                <br/>
                USD, 150, style: "name" - <FormatCurrency locale={this.state.locale} currency="USD" options={{ style: "name" }}>{150}</FormatCurrency>
                <br/>
                USD, 150, style: "code" - <FormatCurrency locale={this.state.locale} currency="USD" options={{ style: "code" }}>{150}</FormatCurrency>
                <br/>
                USD, 1.491, round: "ceil" - <FormatCurrency locale={this.state.locale} currency="USD" options={{ round: "ceil" }}>{1.491}</FormatCurrency>
                <br/>
                EUR, 150, locale default - <FormatCurrency locale={this.state.locale} currency="EUR">{150}</FormatCurrency>
                <br/>
                EUR, -150, style: "accounting" - <FormatCurrency locale={this.state.locale} currency="EUR" options={{ style: "accounting" }}>{-150}</FormatCurrency>
                <br/>
                EUR, 150, style: "name" - <FormatCurrency locale={this.state.locale} currency="EUR" options={{ style: "name" }}>{150}</FormatCurrency>
                <br/>
                EUR, 150, style: "code" - <FormatCurrency locale={this.state.locale} currency="EUR" options={{ style: "code" }}>{150}</FormatCurrency>
                <br/>
                EUR, 1.491, round: "ceil" - <FormatCurrency locale={this.state.locale} currency="EUR" options={{ round: "ceil" }}>{1.491}</FormatCurrency>
                <br/>
                EUR, 150, style: "code", with CSS class -
                <FormatCurrency className='firstClass' locale={this.state.locale} currency="EUR" options={{ style: "code" }}>{150}</FormatCurrency>
            </div>
        );
    }
});
