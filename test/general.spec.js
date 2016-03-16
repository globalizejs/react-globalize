/*global expect React shallow Globalize*/
import FormatCurrency from "../dist/currency";

describe("General Functionality Tests", () => {
    it("overrides default locale to format 150 as 150,00 €", () => {
        const wrapper = shallow(<FormatCurrency locale="de" currency="EUR">{150}</FormatCurrency>);
        expect(wrapper.text()).to.equal("150,00 €");
    });

    it("uses value prop instead of children to display $200.00", () => {
        const wrapper = shallow(<FormatCurrency currency="USD" value={200}>{150}</FormatCurrency>);
        expect(wrapper.text()).to.equal("$200.00");
    });

    it("uses value prop instead of children to display $0.00 even though 0 is falsey", () => {
        const wrapper = shallow(<FormatCurrency currency="USD" value={0}>{150}</FormatCurrency>);
        expect(wrapper.text()).to.equal("$0.00");
    });
});
