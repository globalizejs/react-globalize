/*global expect React shallow Globalize*/
import FormatCurrency from "../dist/currency";

describe("General Functionality Tests", () => {
    it("overrides default locale to format 150 as 150,00 €", () => {
        const wrapper = shallow(<FormatCurrency locale="de" currency="EUR">{150}</FormatCurrency>);
        expect(wrapper.text()).to.equal("150,00 €");
    });
});
