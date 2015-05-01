var React = require("react");
var FormatDate = require("react-globalize").FormatDate;

var LocalizedDates = React.createClass({
    render: function() {
        return (
            <div>
                default - <FormatDate value={new Date()} />
                <br />
                skeleton: "GyMMMd" - <FormatDate value={new Date()} options={{ skeleton: "GyMMMd" }} />
                <br/>
                date: "medium" - <FormatDate value={new Date()} options={{ date: "medium" }} />
                <br/>
                time: "medium" - <FormatDate value={new Date()} options={{ time: "medium" }} />
                <br/>
                datetime: "medium" - <FormatDate value={new Date()} options={{ datetime: "medium" }} />
            </div>
        );
    }
});

module.exports = LocalizedDates;
