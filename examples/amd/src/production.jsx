require([
    "react",
    "jsx!./app",
    "globalize-precompiled-formatters"
], function(React, App) {

React.render( <App locale="en" />, document.body );

});
