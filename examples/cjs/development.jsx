var React = require("react");
var App = require("./app");

require("./load-globalize-i18n-data.js");
React.render( <App locale="en" />, document.body );
