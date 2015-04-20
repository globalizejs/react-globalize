import React from "react";
import generator from "./generator";
import "globalize/date";

export default React.createClass(generator("formatDate", ["value", "options"]));
