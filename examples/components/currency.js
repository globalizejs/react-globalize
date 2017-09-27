import React from "react";
import { FormatCurrency } from "../react-globalize";

class LocalizedCurrencies extends React.PureComponent {
    state = {
        locale: "en",
    };
    handleChange = (event) => {
        this.setState({
            locale: event.target.value,
        });
    }
    render() {
        return (
            <div>
                <div>
                    Select a locale:
                    <select onChange={this.handleChange}>
                        <option value="en">en</option>
                        <option value="pt-BR">pt-BR</option>
                    </select>
                </div>
                <br />
                USD, 150, locale default - <FormatCurrency locale={this.state.locale} currency="USD">{150}</FormatCurrency>
                <br />
                USD, -150, style: &quot;accounting&quot; - <FormatCurrency locale={this.state.locale} currency="USD" options={{ style: "accounting" }}>{-150}</FormatCurrency>
                <br />
                USD, 150, style: &quot;name&quot; - <FormatCurrency locale={this.state.locale} currency="USD" options={{ style: "name" }}>{150}</FormatCurrency>
                <br />
                USD, 150, style: &quot;code&quot; - <FormatCurrency locale={this.state.locale} currency="USD" options={{ style: "code" }}>{150}</FormatCurrency>
                <br />
                USD, 1.491, round: &quot;ceil&quot; - <FormatCurrency locale={this.state.locale} currency="USD" options={{ round: "ceil" }}>{1.491}</FormatCurrency>
                <br />
                EUR, 150, locale default - <FormatCurrency locale={this.state.locale} currency="EUR">{150}</FormatCurrency>
                <br />
                EUR, -150, style: &quot;accounting&quot; - <FormatCurrency locale={this.state.locale} currency="EUR" options={{ style: "accounting" }}>{-150}</FormatCurrency>
                <br />
                EUR, 150, style: &quot;name&quot; - <FormatCurrency locale={this.state.locale} currency="EUR" options={{ style: "name" }}>{150}</FormatCurrency>
                <br />
                EUR, 150, style: &quot;code&quot; - <FormatCurrency locale={this.state.locale} currency="EUR" options={{ style: "code" }}>{150}</FormatCurrency>
                <br />
                EUR, 1.491, round: &quot;ceil&quot; - <FormatCurrency locale={this.state.locale} currency="EUR" options={{ round: "ceil" }}>{1.491}</FormatCurrency>
                <br />
                EUR, 150, style: &quot;code&quot;, with CSS class -
                <FormatCurrency className="firstClass" locale={this.state.locale} currency="EUR" options={{ style: "code" }}>{150}</FormatCurrency>
            </div>
        );
    }
}
export default LocalizedCurrencies;
