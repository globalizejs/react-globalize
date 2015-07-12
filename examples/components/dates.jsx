var React = require("react");
var ReactGlobalize = require("react-globalize");
var FormatMessage = ReactGlobalize.FormatMessage;
var FormatDate = ReactGlobalize.FormatDate;

var LocalizedDates = React.createClass({
    getInitialState: function() {
      setInterval(function() {
          this.updateDate();
      }.bind(this), 1000);
      return {
          date: new Date()
      }
    },
    updateDate: function() {
      this.setState({
          date: new Date()
      });
    },
    render: function() {
        var date = this.state.date;
        return (
            <div>
                <h1>Dates</h1>
                <table>
                    <thead>
                        <tr>
                            <th><FormatMessage>Description</FormatMessage></th>
                            <th><FormatMessage>Options</FormatMessage></th>
                            <th><FormatMessage>Localized Now</FormatMessage></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <p>Formatting dates using the default options</p>
                            </td>
                            <td>
                                <p>{"{}"}</p>
                            </td>
                            <td>
                                <FormatDate>{date}</FormatDate>
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={3}>
                                <p>Formatting dates using presets</p>
                            </td>
                            <td>
                                <p>{"{date: \"medium\"}"}</p>
                            </td>
                            <td>
                                <FormatDate options={{date: "medium"}}>{date}</FormatDate>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>{"{time: \"medium\"}"}</p>
                            </td>
                            <td>
                                <FormatDate options={{time: "medium"}}>{date}</FormatDate>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>{"{datetime: \"medium\"}"}</p>
                            </td>
                            <td>
                                <FormatDate options={{datetime: "medium"}}>{date}</FormatDate>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Formatting dates selecting the fields individually</p>
                            </td>
                            <td>
                                <p>{"{skeleton: \"GyMMMdhms\"}"}</p>
                            </td>
                            <td>
                                <FormatDate options={{skeleton: "GyMMMdhms"}}>{date}</FormatDate>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = LocalizedDates;
