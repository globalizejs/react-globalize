import Globalize from "globalize";
import React from "react";
import generator from "./generator";
import "globalize/message";
import "globalize/plural";

export default React.createClass(generator("formatMessage", ["path", "variables"]));
