define(['react', './generator', 'globalize/currency'], function (React, generator) {

	'use strict';

	return generator("formatCurrency", ["value", "currency", "options"]);

});