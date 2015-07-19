var Globalize = require("globalize");
var React = require("react");
var ReactGlobalize = require("react-globalize");
var FormatMessage = ReactGlobalize.FormatMessage;

var names = ["Beethoven", "Mozart", "Mendelssohn"];
var gender = {
    "Beethoven": "male",
    "Mendelssohn": "female",
    "Mozart": "male"
};

function sanitizePath(pathString) {
    return pathString.trim().replace(/\{/g, "(").replace(/\}/g, ")").replace(/\//g, "|").replace(/\n/g, " ").replace(/ +/g, " ").replace(/"/g, "'");
}

function getRawLocalizedMessage(message) {
    return Globalize.cldr.get(["globalize-messages/{bundle}", sanitizePath(message)]) || message;
}

var LocalizedMessages = React.createClass({
    getInitialState: function() {
        return {
            nameA: "Beethoven",
            host: "Beethoven",
            hostGender: gender["Beethoven"],
            guest: "Mozart",
            guestGender: gender["Mozart"],
            count: 0
        };
    },
    handleSubmit: function(event) {
        event.preventDefault();
    },
    handleNameA: function(event) {
        this.setState({
            nameA: event.target.value
        });
    },
    handleHost: function(event) {
        var value = event.target.value;
        this.setState({
            host: value,
            hostGender: gender[value]
        });
    },
    handleGuest: function(event) {
        var value = event.target.value;
        this.setState({
            guest: value,
            guestGender: gender[value]
        });
    },
    handleCount: function(event) {
        var value = event.target.value;
        if (+value < 0) {
            return;
        }
        this.setState({
            count: value
        });
    },
    render: function() {
        return (
            <div>
                <h1>Messages</h1>
                <h3>Simple variable replacement</h3>
                <dl>
                    <dt>Message</dt>
                    <dd><pre>{getRawLocalizedMessage("Hello, {name}")}</pre></dd>
                    <dt>Variables</dt>
                    <dd>
                        <pre>{"{name: \"" + this.state.nameA + "\"}"}</pre>
                        <form action="#" onSubmit={this.handleSubmit}>
                            <select onChange={this.handleNameA}>
                                {names.map(function(name) {
                                    return <option key={"name-" + name} value={name}>{name}</option>;
                                }.bind(this))}
                            </select>
                        </form>
                    </dd>
                    <dt>Localized message</dt>
                    <dd><FormatMessage variables={{name: this.state.nameA}}>{"Hello, {name}"}</FormatMessage></dd>
                </dl>

                <h3>Gender inflection</h3>
                <dl>
                    <dt>Message</dt>
                    <dd><pre>{getRawLocalizedMessage(
                        "{hostGender, select,\n" +
                        "  female {{host} invites {guest} to her party}\n" +
                        "    male {{host} invites {guest} to his party}\n" +
                        "   other {{host} invites {guest} to their party}\n" +
                        "}"
                    )}</pre></dd>
                    <dt>Variables</dt>
                    <dd>
                        <pre>{
                            "{\n" +
                            "  host: \"" + this.state.host + "\",\n" +
                            "  hostGender: \"" +  this.state.hostGender + "\",\n" +
                            "  guest: \"" +  this.state.guest + "\",\n" +
                            "  guestGender: \"" +  this.state.guestGender + "\"\n" +
                            "}"
                        }</pre>
                        <form action="#" onSubmit={this.handleSubmit}>
                            <select onChange={this.handleHost}>
                                {names.map(function(name) {
                                    return <option key={"host-" + name} value={name} defaultValue={this.state.host}>{"Host: " + name + " (" + gender[name] + ")"}</option>;
                                }.bind(this))}
                            </select>
                            <select onChange={this.handleGuest}>
                                {names.map(function(name) {
                                    return <option key={"guest-" + name} value={name} defaultValue={this.state.guest}>{"Guest: " + name + " (" + gender[name] + ")"}</option>;
                                }.bind(this))}
                            </select>
                        </form>
                    </dd>
                    <dt>Localized message</dt>
                    <dd>
                        <FormatMessage
                            variables={
                                {
                                    host: this.state.host,
                                    hostGender: this.state.hostGender,
                                    guest: this.state.guest,
                                    guestGender: this.state.guestGender
                                }
                            }
                        >{
                        "{hostGender, select,\n" +
                        "  female {{host} invites {guest} to her party}\n" +
                        "    male {{host} invites {guest} to his party}\n" +
                        "   other {{host} invites {guest} to their party}\n" +
                        "}"
                        }</FormatMessage>
                    </dd>
                </dl>

                <h3>Pluralization</h3>
                <dl>
                    <dt>Message</dt>
                    <dd><pre>{getRawLocalizedMessage(
                        "You have {count, plural,\n" +
                        "     =0 {no tasks}\n" +
                        "    one {one task}\n" +
                        "  other {{formattedCount} tasks}\n" +
                        "} remaining"
                    )}</pre></dd>
                    <dt>Variables</dt>
                    <dd>
                        <pre>{
                            "{\n" +
                            "  count: " + (+this.state.count) + ",\n" +
                            "  formattedCount: \"" +  Globalize.formatNumber(+this.state.count) + "\"\n" +
                            "}"
                        }</pre>
                        <form action="#" onSubmit={this.handleSubmit}>
                            <input type="number" value={this.state.count} onChange={this.handleCount} />
                        </form>
                    </dd>
                    <dt>Localized message</dt>
                    <dd>
                        <FormatMessage
                            variables={
                                {
                                    count: +this.state.count,
                                    formattedCount: Globalize.formatNumber(+this.state.count)
                                }
                            }
                        >{
                        "You have {count, plural,\n" +
                        "     =0 {no tasks}\n" +
                        "    one {one task}\n" +
                        "  other {{formattedCount} tasks}\n" +
                        "} remaining"
                        }</FormatMessage>
                    </dd>
                </dl>

            </div>
        );
    }
});

module.exports = LocalizedMessages;
