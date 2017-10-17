/*global expect React shallow Globalize*/
import FormatCurrency from "../src/currency";
import FormatMessage from "../src/message";

describe("Any Component", () => {
    it("doesn't forward ReactGlobalize specific props to underlying DOM component", () => {
        let wrapper = shallow(<FormatCurrency locale="de" currency="EUR">{150}</FormatCurrency>);
        expect(wrapper.props()).to.contain.all.keys(["children"]);
        expect(wrapper.props()).to.not.contain.any.keys(["locale", "currency"]);

        wrapper = shallow(<FormatMessage className="a-class-name" style={{aStyle: 1}} elements={{foo: 1}} variables={{bar: 2}}>Hello</FormatMessage>);
        expect(wrapper.props()).to.contain.all.keys(["children", "className", "style"]);
        expect(wrapper.props()).to.not.contain.any.keys(["elements", "variables"]);
    });

    it("overrides default locale to format 150 as 150,00 €", () => {
        const wrapper = shallow(<FormatCurrency locale="de" currency="EUR">{150}</FormatCurrency>);
        expect(wrapper.text()).to.equal("150,00 €");
    });

    it("updates when props change", () => {
        const wrapper = shallow(<FormatCurrency locale="de" currency="EUR">{150}</FormatCurrency>);
        expect(wrapper.text()).to.equal("150,00 €");
        wrapper.setProps({ children: 200, currency: "USD" });
        expect(wrapper.text()).to.equal("200,00 $");
    });
});
