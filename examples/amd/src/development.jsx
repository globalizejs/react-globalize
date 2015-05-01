define([
    "react",
    "jsx!./app",
    "./load-globalize-i18n-data"
], function(React, App) {

React.render( <App locale="en" />, document.body );

});
