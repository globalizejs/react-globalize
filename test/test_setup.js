import { expect } from "chai";
import React from "react";
import { shallow } from "enzyme";
import Globalize from "globalize";

global.expect = expect;
global.React = React;
global.shallow = shallow;
global.Globalize = Globalize;

Globalize.load(
  require( "cldr-data" ).entireSupplemental(),
  require( "cldr-data" ).entireMainFor("en"),
  require( "cldr-data" ).entireMainFor("de")
);

Globalize.locale("en");
