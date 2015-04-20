var React = require("react");
var ReactGlobalize = require("react-globalize");
var FormatMessage = ReactGlobalize.FormatMessage;
var FormatNumber = ReactGlobalize.FormatNumber;

var LocalizedMessages = React.createClass({
    render: function() {
        return (
            <div>
                <h3>Simple Salutation</h3>
                hi - <FormatMessage path="salutations/hi" />
                <br/>
                bye - <FormatMessage path="salutations/bye" />
                <h3>Variable Replacement</h3>
                ["Wolfgang", "Amadeus", "Mozart"] - <FormatMessage path="variables/hello" variables={["Wolfgang", "Amadeus", "Mozart"]} />
                <br/>
                {JSON.stringify({first:"Wolfgang", middle:"Amadeus", last:"Mozart"})} - <FormatMessage path="variables/hey" variables={{first:"Wolfgang", middle:"Amadeus", last:"Mozart"}} />
                <h3>Gender Inflection</h3>
                {JSON.stringify({guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"male"})} - <FormatMessage path="party" variables={{guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"male"}} />
                <br/>
                {JSON.stringify({guest:"Mozart", guestGender:"male", host:"Mendelssohn", hostGender:"female"})} - <FormatMessage path="party" variables={{guest:"Mozart", guestGender:"male", host:"Mendelssohn", hostGender:"female"}} />
                <br/>
                {JSON.stringify({guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"other"})} - <FormatMessage path="party" variables={{guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"other"}} />
                <br/>
                {JSON.stringify({guest:"Mozart", guestGender:"other", host:"Beethoven", hostGender:"male"})} - <FormatMessage path="party" variables={{guest:"Mozart", guestGender:"other", host:"Mendelssohn", hostGender:"female"}} />
                <br/>
                {JSON.stringify({guest:"Mozart", guestGender:"other", host:"Beethoven", hostGender:"other"})} - <FormatMessage path="party" variables={{guest:"Mozart", guestGender:"other", host:"Beethoven", hostGender:"other"}} />
                <h3>Plural Inflection</h3>
                task count 1 - <FormatMessage path="task" variables={{count: 1}} />
                <br/>
                task count 0 - <FormatMessage path="task" variables={{count: 0}} />
                <br/>
                task count 1000 formatted - <FormatMessage ref="formattedTask" path="task" variables={{
                    count: 1000,
                    formattedCount: <FormatNumber value={1000} />
                }} />
                <br/>
                like count 0 with offset:1 - <FormatMessage path="likeIncludingMe" variables={{count: 0}} />
                <br/>
                like count 1 with offset:1 - <FormatMessage path="likeIncludingMe" variables={{count: 1}} />
                <br/>
                like count 2 with offset:1 - <FormatMessage path="likeIncludingMe" variables={{count: 2}} />
                <br/>
                like count 3 with offset:1 - <FormatMessage path="likeIncludingMe" variables={{count: 3}} />
            </div>
        );
    }
});

module.exports = LocalizedMessages;
