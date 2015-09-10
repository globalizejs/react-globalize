define(['react', './generator', 'globalize/currency'], function (React, generator) {

	'use strict';

	return React.createClass(generator("formatCurrency", ["value", "currency", "options"]));

});