var React = require("react");
var ReactGlobalize = require("react-globalize");
var FormatCurrency = ReactGlobalize.FormatCurrency;
var FormatMessage = ReactGlobalize.FormatMessage;

var LocalizedCurrencies = React.createClass({
    getInitialState: function() {
        return {
            valueA: 150,
            valueB: 1,
            valueC: -1000,
            valueD: 1.491
        }
    },
    handleSubmit: function(event) {
        event.preventDefault();
    },
    handleValueA: function(event) {
        this.setState({
            valueA: event.target.value
        });
    },
    handleValueB: function(event) {
        this.setState({
            valueB: event.target.value
        });
    },
    handleValueC: function(event) {
        this.setState({
            valueC: event.target.value
        });
    },
    handleValueD: function(event) {
        this.setState({
            valueD: event.target.value
        });
    },
    render: function() {
        console.log("render");
        return (
            <div>
                <h1>Currencies</h1>
                <table>
                    <thead>
                        <tr>
                            <th><FormatMessage>Description</FormatMessage></th>
                            <th><FormatMessage>Options</FormatMessage></th>
                            <th><FormatMessage>Value</FormatMessage></th>
                            <th><FormatMessage>Currency</FormatMessage></th>
                            <th><FormatMessage>Localized Value</FormatMessage></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan={3}>
                                <p>Formatting currencies using symbols, the default</p>
                            </td>
                            <td rowSpan={3}>
                                <p>{"{}"}</p>
                            </td>
                            <td rowSpan={3}>
                                <form action="#" onSubmit={this.handleSubmit}>
                                    <input type="number" value={this.state.valueA} onChange={this.handleValueA} />
                                </form>
                            </td>
                            <td>
                                <p>USD</p>
                            </td>
                            <td>
                                <FormatCurrency currency="USD">{+this.state.valueA}</FormatCurrency>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>EUR</p>
                            </td>
                            <td>
                                <FormatCurrency currency="EUR">{+this.state.valueA}</FormatCurrency>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>CNY</p>
                            </td>
                            <td>
                                <FormatCurrency currency="CNY">{+this.state.valueA}</FormatCurrency>
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={3}>
                                <p>Formatting currencies in their full names</p>
                            </td>
                            <td rowSpan={3}>
                                <p>{"{style: \"name\"}"}</p>
                            </td>
                            <td rowSpan={3}>
                                <form action="#" onSubmit={this.handleSubmit}>
                                    <input type="number" value={this.state.valueB} onChange={this.handleValueB} />
                                </form>
                            </td>
                            <td>
                                <p>USD</p>
                            </td>
                            <td>
                                <FormatCurrency currency="USD" options={{style: "name"}}>{+this.state.valueB}</FormatCurrency>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>EUR</p>
                            </td>
                            <td>
                                <FormatCurrency currency="EUR" options={{style: "name"}}>{+this.state.valueB}</FormatCurrency>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>CNY</p>
                            </td>
                            <td>
                                <FormatCurrency currency="CNY" options={{style: "name"}}>{+this.state.valueB}</FormatCurrency>
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={3}>
                                <p>Formatting currencies in the accounting form</p>
                            </td>
                            <td rowSpan={3}>
                                <p>{"{style: \"accounting\"}"}</p>
                            </td>
                            <td rowSpan={3}>
                                <form action="#" onSubmit={this.handleSubmit}>
                                    <input type="number" value={this.state.valueC} onChange={this.handleValueC} />
                                </form>
                            </td>
                            <td>
                                <p>USD</p>
                            </td>
                            <td>
                                <FormatCurrency currency="USD" options={{style: "accounting"}}>{+this.state.valueC}</FormatCurrency>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>EUR</p>
                            </td>
                            <td>
                                <FormatCurrency currency="EUR" options={{style: "accounting"}}>{+this.state.valueC}</FormatCurrency>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>CNY</p>
                            </td>
                            <td>
                                <FormatCurrency currency="CNY" options={{style: "accounting"}}>{+this.state.valueC}</FormatCurrency>
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={3}>
                                <p>Formatting currencies specifying the rounding method</p>
                            </td>
                            <td rowSpan={3}>
                                <p>{"{round: \"ceil\"}"}</p>
                            </td>
                            <td rowSpan={3}>
                                <form action="#" onSubmit={this.handleSubmit}>
                                    <input type="number" value={this.state.valueD} onChange={this.handleValueD} />
                                </form>
                            </td>
                            <td>
                                <p>USD</p>
                            </td>
                            <td>
                                <FormatCurrency currency="USD" options={{round: "ceil"}}>{+this.state.valueD}</FormatCurrency>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>EUR</p>
                            </td>
                            <td>
                                <FormatCurrency currency="EUR" options={{round: "ceil"}}>{+this.state.valueD}</FormatCurrency>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>CNY</p>
                            </td>
                            <td>
                                <FormatCurrency currency="CNY" options={{round: "ceil"}}>{+this.state.valueD}</FormatCurrency>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = LocalizedCurrencies;
