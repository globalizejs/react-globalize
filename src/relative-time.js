import React from "react";
import generator from "./generator";
import "globalize/relative-time";

export default React.createClass(generator("formatRelativeTime", ["value", "unit", "options"]));
