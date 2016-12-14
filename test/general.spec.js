/*global expect React shallow Globalize*/
import FormatCurrency from "../dist/currency";
import FormatMessage from "../dist/message";

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
        const wrapper = shallow(<FormatMessage className="a-class-name">Hello</FormatMessage>);
        expect(wrapper.props().className).to.equal("a-class-name");
        wrapper.setProps({ className: "b-class-name" });
        expect(wrapper.props().className).to.equal("b-class-name");
    });
});
