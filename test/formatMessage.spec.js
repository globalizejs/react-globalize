/* global expect React shallow Globalize */
import { FormatMessage } from "../dist/index.umd";

Globalize.loadMessages({
    en: {
        salutations: {
            hi: "Hi",
        },
        variables: {
            hello: "Hello, {0} {1} {2}",
        },
        elements: {
            rglink: "For more information, see [reactGlobalizeLink]React Globalize[/reactGlobalizeLink]",
        },
        party: [
            "{hostGender, select,",
            "  female {{host} invites {guest} to her party}",
            "    male {{host} invites {guest} to his party}",
            "   other {{host} invites {guest} to their party}",
            "}",
        ],
        task: [
            "You have {count, plural,",
            "     =0 {no tasks}",
            "    one {one task}",
            "  other {{formattedCount} tasks}",
            "} remaining",
        ],
    },
});

["development", "production"].forEach((env) => {
    describe(`formatMessage Component (${env})`, () => {
        const originalEnv = process.env.NODE_ENV;

        before(() => {
            process.env.NODE_ENV = env;
        });

        after(() => {
            process.env.NODE_ENV = originalEnv;
        });

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

        it("properly replaces elements", () => {
            // eslint-disable-next-line jsx-a11y/anchor-has-content, react/self-closing-comp
            const wrapper = shallow(<FormatMessage path="elements/rglink" elements={{ reactGlobalizeLink: <a href="https://github.com/jquery-support/react-globalize"></a> }} />);
            expect(wrapper.html()).to.equal("<span>For more information, see <a href=\"https://github.com/jquery-support/react-globalize\">React Globalize</a></span>");
        });

        it("uses proper gender inflection", () => {
            const wrapper = shallow(<FormatMessage path="party" variables={{ guest: "Mozart", guestGender: "male", host: "Beethoven", hostGender: "other" }} />);
            expect(wrapper.text()).to.equal("Beethoven invites Mozart to their party");
        });

        it("uses proper plural inflection", () => {
            const wrapper = shallow(<FormatMessage path="task" variables={{ count: 1 }} />);
            expect(wrapper.text()).to.equal("You have one task remaining");
        });

        it("updates when children change", () => {
            const wrapper = shallow(<FormatMessage>Hello</FormatMessage>);
            wrapper.setProps({ children: "Goodbye" });
            expect(wrapper.text()).to.equal("Goodbye");
        });
    });
});
