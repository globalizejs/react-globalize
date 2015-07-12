var React = require("react");
var ReactGlobalize = require("react-globalize");
var FormatNumber = ReactGlobalize.FormatNumber;
var FormatMessage = ReactGlobalize.FormatMessage;

var LocalizedNumbers = React.createClass({
    getInitialState: function() {
        return {
            valueA: Math.PI,
            valueB: 1,
            valueC: 0.5
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
    render: function() {
        return (
            <div>
                <h1>Numbers</h1>
                <table>
                    <thead>
                        <tr>
                            <th><FormatMessage>Description</FormatMessage></th>
                            <th><FormatMessage>Options</FormatMessage></th>
                            <th><FormatMessage>Value</FormatMessage></th>
                            <th><FormatMessage>Localized Value</FormatMessage></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <p>Formatting numbers using the default options</p>
                            </td>
                            <td>
                                <p>{"{}"}</p>
                            </td>
                            <td rowSpan={4}>
                                <form action="#" onSubmit={this.handleSubmit}>
                                    <input type="number" value={this.state.valueA} onChange={this.handleValueA} />
                                </form>
                            </td>
                            <td>
                                <FormatNumber>{+this.state.valueA}</FormatNumber>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Formatting numbers specifying the rounding method</p>
                            </td>
                            <td>
                                <p>{"{round: \"floor\"}"}</p>
                            </td>
                            <td>
                                <FormatNumber options={{round: "floor"}}>{+this.state.valueA}</FormatNumber>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Formatting numbers specifying the maximum fraction digits</p>
                            </td>
                            <td>
                                <p>{"{maximumFractionDigits: 2}"}</p>
                            </td>
                            <td>
                                <FormatNumber options={{maximumFractionDigits: 2}}>{+this.state.valueA}</FormatNumber>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Formatting numbers specifying significant digits</p>
                            </td>
                            <td>
                                <p>
                                    {"{"}<br />
                                    <div style={{paddingLeft: "1em"}}>minimumSignificantDigits: 2,<br />maximumSignificantDigits: 4</div>
                                    {"}"}
                                </p>
                            </td>
                            <td>
                                <FormatNumber options={{minimumSignificantDigits: 2, maximumSignificantDigits: 4}}>{+this.state.valueA}</FormatNumber>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Formatting numbers using the default options (again)</p>
                            </td>
                            <td>
                                <p>{"{}"}</p>
                            </td>

                            <td rowSpan={2}>
                                <form action="#" onSubmit={this.handleSubmit}>
                                    <input type="number" value={this.state.valueB} onChange={this.handleValueB} />
                                </form>
                            </td>
                            <td>
                                <FormatNumber>{+this.state.valueB}</FormatNumber>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Formatting numbers specifying the maximum fraction digits</p>
                            </td>
                            <td>
                                <p>{"{minimumFractionDigits: 2}"}</p>
                            </td>
                            <td>
                                <FormatNumber options={{minimumFractionDigits: 2}}>{+this.state.valueB}</FormatNumber>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <p>Formatting percentages</p>
                            </td>
                            <td>
                                <p>{"{style: \"percent\"}"}</p>
                            </td>
                            <td>
                                <form action="#" onSubmit={this.handleSubmit}>
                                    <input type="number" value={this.state.valueC} onChange={this.handleValueC} />
                                </form>
                            </td>
                            <td>
                                <FormatNumber options={{style: "percent"}}>{+this.state.valueC}</FormatNumber>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = LocalizedNumbers;
