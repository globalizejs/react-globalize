import React from "react";
import { FormatNumber } from "../react-globalize";

class LocalizedNumbers extends React.Component {
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
                <br/>
                pi, no options - <FormatNumber locale={this.state.locale}>{Math.PI}</FormatNumber>
                <br/>
                pi, maximumFractionDigits: 5 - <FormatNumber locale={this.state.locale} options={{ maximumFractionDigits: 5 }}>{Math.PI}</FormatNumber>
                <br/>
                pi, round: 'floor' - <FormatNumber locale={this.state.locale} options={{ round: 'floor' }}>{Math.PI}</FormatNumber>
                <br/>
                10000, minimumFractionDigits: 2 - <FormatNumber locale={this.state.locale} options={{ minimumFractionDigits: 2 }}>{10000}</FormatNumber>
                <br/>
                0.5, style: 'percent' - <FormatNumber locale={this.state.locale} options={{ style: 'percent' }}>{0.5}</FormatNumber>
                <br/>
                0.5, style: 'percent' with inline styles -
                <FormatNumber style={{fontWeight: 'bold', color: 'chocolate'}} locale={this.state.locale} options={{ style: 'percent' }}>{0.5}</FormatNumber>
            </div>
        );
    }
}
export default LocalizedNumbers;
