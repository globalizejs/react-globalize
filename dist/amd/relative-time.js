define(['react', './generator', 'globalize/relative-time'], function (React, generator) {

	'use strict';

	return React.createClass(generator("formatRelativeTime", ["value", "unit", "options"]));

});