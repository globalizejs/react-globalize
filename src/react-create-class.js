import React from "react";

const [major, minor] = React.version.split(".");

const REACT15 = major === "15";
const REACT155 = REACT15 && minor >= 5;

let reactCreateClass;
if (REACT155) {
    reactCreateClass = require("create-react-class");
} else {
    reactCreateClass = React.createClass;
}

export default reactCreateClass;
