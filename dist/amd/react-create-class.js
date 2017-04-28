define(['react'], function (React) {

    'use strict';

    var versions = React.version.split(".");
    var major = versions[0];
    var minor = versions[1];

    var REACT15 = major === "15";
    var REACT155 = REACT15 && minor >= 5;

    var reactCreateClass;
    if (REACT155) {
        reactCreateClass = require("create-react-class");
    } else {
        reactCreateClass = React.createClass;
    }


    return reactCreateClass;

});