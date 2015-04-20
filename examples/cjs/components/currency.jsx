var React = require("react");
var FormatCurrency = require("react-globalize").FormatCurrency;

var LocalizedCurrencies = React.createClass({
    render: function() {
        return (
            <div>
                USD, 150, default - <FormatCurrency currency="USD" value={150} />
                <br/>
                USD, -150, style: "accounting" - <FormatCurrency currency="USD" value={-150} options={{ style: "accounting" }} />
                <br/>
                USD, 150, style: "name" - <FormatCurrency currency="USD" value={150} options={{ style: "name" }} />
                <br/>
                USD, 150, style: "code" - <FormatCurrency currency="USD" value={150} options={{ style: "code" }} />
                <br/>
                USD, 1.491, round: "ceil" - <FormatCurrency currency="USD" value={1.491} options={{ round: "ceil" }} />
                <br/>
                EUR, 150, default - <FormatCurrency currency="EUR" value={150} />
                <br/>
                EUR, -150, style: "accounting" - <FormatCurrency currency="EUR" value={-150} options={{ style: "accounting" }} />
                <br/>
                EUR, 150, style: "name" - <FormatCurrency currency="EUR" value={150} options={{ style: "name" }} />
                <br/>
                EUR, 150, style: "code" - <FormatCurrency currency="EUR" value={150} options={{ style: "code" }} />
                <br/>
                EUR, 1.491, round: "ceil" - <FormatCurrency currency="EUR" value={1.491} options={{ round: "ceil" }} />
            </div>
        );
    }
});

module.exports = LocalizedCurrencies;
