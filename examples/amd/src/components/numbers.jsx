define([
    "react",
    "react-globalize"
], function(React, ReactGlobalize) {

var FormatNumber = ReactGlobalize.FormatNumber;

var LocalizedNumbers = React.createClass({
    render: function() {
        return (
            <div>
                pi, no options - <FormatNumber value={Math.PI} />
                <br/>
                pi, maximumFractionDigits: 5 - <FormatNumber value={Math.PI} options={{ maximumFractionDigits: 5 }} />
                <br/>
                pi, round: "floor" - <FormatNumber value={Math.PI} options={{ round: "floor" }} />
                <br/>
                10000, minimumFractionDigits: 2 - <FormatNumber value={10000} options={{ minimumFractionDigits: 2 }} />
                <br/>
                0.5, style: "percent" - <FormatNumber value={0.5} options={{ style: "percent" }} />
            </div>
        );
    }
});

return LocalizedNumbers;

});
