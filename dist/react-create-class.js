'use strict';

var React = require('react');

var [major, minor] = React.version.split(".");

var REACT15 = major === "15";
var REACT155 = REACT15 && minor >= 5;

var reactCreateClass;
if (REACT155) {
    reactCreateClass = require("create-react-class");
} else {
    reactCreateClass = React.createClass;
}

module.exports = reactCreateClass;