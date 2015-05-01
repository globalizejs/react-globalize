var React = require("react");
if ( window ) {
  window.Globalize = require("./tmp/globalize-precompiled-formatters");
} else {
  GLOBAL.Globalize = require("./tmp/globalize-precompiled-formatters");
}
var App = require("./app");

React.render( <App />, document.body );
