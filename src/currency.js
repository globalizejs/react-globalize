import React from "react";
import generator from "./generator";
import "globalize/currency";

export default React.createClass(generator("formatCurrency", ["value", "currency", "options"]));
