import React from "react";
import generator from "./generator";
import "globalize/number";

export default React.createClass(generator("formatNumber", ["value", "options"]));
