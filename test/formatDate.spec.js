/*global expect React shallow Globalize*/
import FormatDate from "../src/date";

describe("formatDate Component", () => {
    it("renders as a <span>", () => {
        const wrapper = shallow(<FormatDate options={{date: "medium"}}>{new Date()}</FormatDate>);
        expect(wrapper.type()).to.equal("span");
    });

    it("formats date using default pattern as 1/1/2016", () => {
        const wrapper = shallow(<FormatDate>{new Date("Jan 01 2016")}</FormatDate>);
        expect(wrapper.text()).to.equal("1/1/2016");
    });

    it("formats date using options 'Jan 1, 2016'", () => {
        const wrapper = shallow(<FormatDate options={{date: "medium"}}>{new Date(2016, 0, 1)}</FormatDate>);
        expect(wrapper.text()).to.equal("Jan 1, 2016");
    });
});
