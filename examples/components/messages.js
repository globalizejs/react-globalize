import React from "react";
import Globalize from "globalize";
import { FormatMessage } from "../react-globalize";


class LocalizedMessages extends React.Component {
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
                <h3>Simple Salutation</h3>
                hi - <FormatMessage locale={this.state.locale} path="salutations/hi" />
                <br/>
                bye - <FormatMessage locale={this.state.locale} path="salutations/bye" />
                <h3>Simple default message</h3>
                <FormatMessage locale={this.state.locale}>Hi</FormatMessage>
                <br/>
                <FormatMessage locale={this.state.locale}>Bye</FormatMessage>
                <br/>
                <FormatMessage locale={this.state.locale}>Hi/Bye</FormatMessage>
                <h3>Default messages with style</h3>
                <FormatMessage style={{color: 'red'}} locale={this.state.locale}>
                  Hi
                </FormatMessage>
                <br/>
                <FormatMessage style={{color: 'blue'}} locale={this.state.locale}>
                  Bye
                </FormatMessage>
                <h3>Variable Replacement</h3>
                [&quot;Wolfgang&quot;, &quot;Amadeus&quot;, &quot;Mozart&quot;] - <FormatMessage locale={this.state.locale} path="variables/hello" variables={["Wolfgang", "Amadeus", "Mozart"]} />
                <br />
                { JSON.stringify({ first: "Wolfgang", middle: "Amadeus", last: "Mozart" }) } - <FormatMessage locale={this.state.locale} path="variables/hey" variables={{ first: "Wolfgang", middle: "Amadeus", last: "Mozart" }} />
                <h3>Element Replacement</h3>
                <FormatMessage
                    locale={this.state.locale}
                    elements={
                        // eslint-disable-next-line jsx-a11y/anchor-has-content, react/self-closing-comp
                        { reactGlobalizeLink: <a href="https://github.com/jquery-support/react-globalize"></a> }
                    }
                >
                    For more information, see [reactGlobalizeLink]React Globalize[/reactGlobalizeLink]
                </FormatMessage>
                <br />
                <FormatMessage
                    locale={this.state.locale}
                    elements={
                        // eslint-disable-next-line react/self-closing-comp
                        { strong: <strong></strong> }
                    }
                >
                    Use Element Replacement to localize messages with [strong]markup[/strong] too.
                </FormatMessage>
                <h3>Gender Inflection</h3>
                {JSON.stringify({guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"male"})} - <FormatMessage locale={this.state.locale} path="party" variables={{guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"male"}} />
                <br/>
                {JSON.stringify({guest:"Mozart", guestGender:"male", host:"Mendelssohn", hostGender:"female"})} - <FormatMessage locale={this.state.locale} path="party" variables={{guest:"Mozart", guestGender:"male", host:"Mendelssohn", hostGender:"female"}} />
                <br/>
                {JSON.stringify({guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"other"})} - <FormatMessage locale={this.state.locale} path="party" variables={{guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"other"}} />
                <br/>
                {JSON.stringify({guest:"Mozart", guestGender:"other", host:"Beethoven", hostGender:"male"})} - <FormatMessage locale={this.state.locale} path="party" variables={{guest:"Mozart", guestGender:"other", host:"Mendelssohn", hostGender:"female"}} />
                <br/>
                {JSON.stringify({guest:"Mozart", guestGender:"other", host:"Beethoven", hostGender:"other"})} - <FormatMessage locale={this.state.locale} path="party" variables={{guest:"Mozart", guestGender:"other", host:"Beethoven", hostGender:"other"}} />
                <h3>Plural Inflection</h3>
                task count 1 - <FormatMessage locale={this.state.locale} path="task" variables={{count: 1}} />
                <br/>
                task count 0 - <FormatMessage locale={this.state.locale} path="task" variables={{count: 0}} />
                <br/>
                task count 1000 formatted - <FormatMessage ref="formattedTask" locale={this.state.locale} path="task" variables={{count: 1000, formattedCount: Globalize(this.state.locale).formatNumber(1000)}} />
                <br/>
                like count 0 with offset:1 - <FormatMessage locale={this.state.locale} path="likeIncludingMe" variables={{count: 0}} />
                <br/>
                like count 1 with offset:1 - <FormatMessage locale={this.state.locale} path="likeIncludingMe" variables={{count: 1}} />
                <br/>
                like count 2 with offset:1 - <FormatMessage locale={this.state.locale} path="likeIncludingMe" variables={{count: 2}} />
                <br/>
                like count 3 with offset:1 - <FormatMessage locale={this.state.locale} path="likeIncludingMe" variables={{count: 3}} />
            </div>
        );
    }
}
export default LocalizedMessages;
