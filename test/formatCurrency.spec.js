/* global expect React shallow Globalize */
import { FormatCurrency } from "../dist/index.umd";

describe("formatCurrency Component", () => {
    it("renders as a <span>", () => {
        const wrapper = shallow(<FormatCurrency currency="USD">{150}</FormatCurrency>);
        expect(wrapper.type()).to.equal("span");
    });

    it("formats 150 as $150.00", () => {
        const wrapper = shallow(<FormatCurrency currency="USD">{150}</FormatCurrency>);
        expect(wrapper.text()).to.equal("$150.00");
    });
});
