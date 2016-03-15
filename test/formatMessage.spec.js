/*global expect React shallow Globalize*/
import FormatMessage from "../dist/message";

Globalize.loadMessages({
    en: {
        salutations: {
            hi: "Hi"
        },
        variables: {
            hello: "Hello, {0} {1} {2}"
        },
        party: [
            "{hostGender, select,",
            "  female {{host} invites {guest} to her party}",
            "    male {{host} invites {guest} to his party}",
            "   other {{host} invites {guest} to their party}",
            "}"
        ],
        task: [
            "You have {count, plural,",
            "     =0 {no tasks}",
            "    one {one task}",
            "  other {{formattedCount} tasks}",
            "} remaining"
        ]
    }
});

describe("formatMessage Component", () => {
    it("renders as a <span>", () => {
        const wrapper = shallow(<FormatMessage path="salutations/hi" />);
        expect(wrapper.type()).to.equal("span");
    });

    it("uses default message and prints 'Hi'", () => {
        const wrapper = shallow(<FormatMessage>Hi</FormatMessage>);
        expect(wrapper.text()).to.equal("Hi");
    });

    it("resolves path and prints 'Hi'", () => {
        const wrapper = shallow(<FormatMessage path="salutations/hi" />);
        expect(wrapper.text()).to.equal("Hi");
    });

    it("properly replaces variables", () => {
        const wrapper = shallow(<FormatMessage path="variables/hello" variables={["Wolfgang", "Amadeus", "Mozart"]} />);
        expect(wrapper.text()).to.equal("Hello, Wolfgang Amadeus Mozart");
    });

    it("uses proper gender inflection", () => {
        const wrapper = shallow(<FormatMessage path="party" variables={{guest:"Mozart", guestGender:"male", host:"Beethoven", hostGender:"other"}} />);
        expect(wrapper.text()).to.equal("Beethoven invites Mozart to their party");
    });

    it("uses proper plural inflection", () => {
        const wrapper = shallow(<FormatMessage path="task" variables={{count: 1}} />);
        expect(wrapper.text()).to.equal("You have one task remaining");
    });
});
