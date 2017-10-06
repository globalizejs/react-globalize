/*global expect React shallow Globalize*/
import FormatNumber from "../src/number";

describe("formatNumber Component", () => {
    it("renders as a <span>", () => {
        const wrapper = shallow(<FormatNumber options={{ round: "floor" }}>{Math.PI}</FormatNumber>);
        expect(wrapper.type()).to.equal("span");
    });

    it("formats pi as 3.141", () => {
        const wrapper = shallow(<FormatNumber options={{ round: "floor" }}>{Math.PI}</FormatNumber>);
        expect(wrapper.text()).to.equal("3.141");
    });
});
