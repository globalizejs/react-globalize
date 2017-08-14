/* global expect React shallow Globalize */
import { FormatRelativeTime } from "../dist/index.umd";

describe("formatRelativeTime Component", () => {
    it("renders as a <span>", () => {
        const wrapper = shallow(<FormatRelativeTime unit="week">{1}</FormatRelativeTime>);
        expect(wrapper.type()).to.equal("span");
    });

    it("formats value of 1 week from now as 'next week'", () => {
        const wrapper = shallow(<FormatRelativeTime unit="week">{1}</FormatRelativeTime>);
        expect(wrapper.text()).to.equal("next week");
    });
});
