import { expect } from "chai";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Globalize from "globalize";

Enzyme.configure({ adapter: new Adapter() });

global.expect = expect;
global.React = React;
global.shallow = shallow;
global.Globalize = Globalize;

Globalize.load(
    require("cldr-data").entireSupplemental(),
    require("cldr-data").entireMainFor("en"),
    require("cldr-data").entireMainFor("de"),
);

Globalize.locale("en");
