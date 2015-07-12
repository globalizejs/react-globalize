var React = require("react");
var LocalizedCurrencies = require("./components/currency");
var LocalizedDates = require("./components/dates");
var LocalizedMessages = require("./components/messages");
var LocalizedNumbers = require("./components/numbers");
var LocalizedRelativeTime = require("./components/relative-time");

React.render(
    <LocalizedCurrencies />, document.getElementById("currency")
);
React.render(
    <LocalizedDates />, document.getElementById("dates")
);
React.render(
    <LocalizedMessages />, document.getElementById("messages")
);
React.render(
    <LocalizedNumbers />, document.getElementById("numbers")
);
React.render(
    <LocalizedRelativeTime />, document.getElementById("relative-time")
);
