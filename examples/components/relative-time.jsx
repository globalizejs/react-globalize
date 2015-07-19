var React = require("react");
var ReactGlobalize = require("react-globalize");
var FormatMessage = ReactGlobalize.FormatMessage;
var FormatRelativeTime = ReactGlobalize.FormatRelativeTime;

var LocalizedDates = React.createClass({
    getInitialState: function() {
      setInterval(function() {
          this.updateSeconds();
      }.bind(this), 1000);
      setInterval(function() {
          this.updateMinutes();
      }.bind(this), 1000 * 60);
      return {
          seconds: 0,
          minutes: 0
      }
    },
    updateSeconds: function() {
      this.setState({
          seconds: --this.state.seconds
      });
    },
    updateMinutes: function() {
      this.setState({
          minutes: --this.state.minutes
      });
    },
    render: function() {
        var date = this.state.date;
        return (
            <div>
                <h1>Relative Times</h1>
                <table>
                    <thead>
                        <tr>
                            <th><FormatMessage>Description</FormatMessage></th>
                            <th><FormatMessage>Unit</FormatMessage></th>
                            <th><FormatMessage>Options</FormatMessage></th>
                            <th><FormatMessage>Localized relative time from this page load</FormatMessage></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <p>Formatting relative times in seconds</p>
                            </td>
                            <td>
                                <p>second</p>
                            </td>
                            <td>
                                <p>{"{}"}</p>
                            </td>
                            <td>
                                <FormatRelativeTime unit="second">{this.state.seconds}</FormatRelativeTime>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Formatting relative times in seconds using the short form</p>
                            </td>
                            <td>
                                <p>second</p>
                            </td>
                            <td>
                                <p>{"{form: \"short\"}"}</p>
                            </td>
                            <td>
                                <FormatRelativeTime unit="second" options={{form: "short"}}>{this.state.seconds}</FormatRelativeTime>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Formatting relative times in minutes</p>
                            </td>
                            <td>
                                <p>minute</p>
                            </td>
                            <td>
                                <p>{"{}"}</p>
                            </td>
                            <td>
                                <FormatRelativeTime unit="minute">{this.state.minutes}</FormatRelativeTime>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Formatting relative times in minutes using the narrow form</p>
                            </td>
                            <td>
                                <p>minute</p>
                            </td>
                            <td>
                                <p>{"{form: \"narrow\"}"}</p>
                            </td>
                            <td>
                                <FormatRelativeTime unit="minute" options={{form: "narrow"}}>{this.state.minutes}</FormatRelativeTime>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = LocalizedDates;
