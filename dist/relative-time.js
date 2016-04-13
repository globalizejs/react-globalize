'use strict';

var React = require('react');
var generator = require('./generator');


module.exports = React.createClass(generator("formatRelativeTime", ["value", "unit", "options"]));