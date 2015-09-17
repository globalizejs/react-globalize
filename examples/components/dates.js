var FormatDate = require('../react-globalize').FormatDate;
var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            locale: "en"
        };
    },
    handleChange: function( event ) {
        this.setState({
            locale: event.target.value
        });
    },
    render: function() {
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
                "GyMMMd" - <FormatDate locale={this.state.locale} pattern="GyMMMd">{new Date()}</FormatDate>
                <br/>
                date: "medium" - <FormatDate locale={this.state.locale} pattern={{ date: "medium" }}>{new Date()}</FormatDate>
                <br/>
                time: "medium" - <FormatDate locale={this.state.locale} pattern={{ time: "medium" }}>{new Date()}</FormatDate>
                <br/>
                datetime: "medium" - <FormatDate locale={this.state.locale} pattern={{ datetime: 'medium' }}>{new Date()}</FormatDate>
                <br/>
                datetime: "medium" with CSS class -
                <FormatDate className='secondClass' locale={this.state.locale} pattern={{ datetime: 'medium' }}>{new Date()}</FormatDate>
            </div>
        );
    }
});
