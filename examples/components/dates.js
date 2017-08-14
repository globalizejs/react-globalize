import React from "react";
import { FormatDate } from "../react-globalize";

class LocalizedDates extends React.Component {
    state = {
        locale: "en",
    };
    handleChange = (event) => {
        this.setState({
            locale: event.target.value,
        });
    }
    render() {
        return (
            <div>
                <div>
                    Select a locale:
                    <select onChange={this.handleChange}>
                        <option value="en">en</option>
                        <option value="pt-BR">pt-BR</option>
                    </select>
                </div>
                <br />
                &quot;GyMMMd&quot; - <FormatDate locale={this.state.locale} pattern="GyMMMd">{new Date()}</FormatDate>
                <br />
                date: &quot;medium&quot; - <FormatDate locale={this.state.locale} pattern={{ date: "medium" }}>{new Date()}</FormatDate>
                <br />
                time: &quot;medium&quot; - <FormatDate locale={this.state.locale} pattern={{ time: "medium" }}>{new Date()}</FormatDate>
                <br />
                datetime: &quot;medium&quot; - <FormatDate locale={this.state.locale} pattern={{ datetime: "medium" }}>{new Date()}</FormatDate>
                <br />
                datetime: &quot;medium&quot; with CSS class -
                <FormatDate className="secondClass" locale={this.state.locale} pattern={{ datetime: "medium" }}>{new Date()}</FormatDate>
            </div>
        );
    }
}
export default LocalizedDates;
