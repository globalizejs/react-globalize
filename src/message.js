import Globalize from "globalize";
import React from "react";
import generator from "./generator";
import "globalize/message";
import "globalize/plural";

function messageSetup(componentProps, instance, args) {
    var defaultMessage, path;
    var children = componentProps.children;
    var scope = componentProps.scope;

    function extractFromFnComments(fn) {
        return fn.toString().replace(/(function \(\) \{\/\*|\*\/\})/g, "");
    }

    function getDefaultMessage(children) {
        if (typeof children === "string") {
            return children;
        } else if (typeof children === "function") {
            return extractFromFnComments(children);
        } else {
            throw new Error("Invalid default message type `" + typeof children + "`");
        }
    }

    function getMessage() {
        return instance.cldr.get(["globalize-messages/{bundle}"].concat(path));
    }

    function setMessage(message) {
        var data = {};
        function set(data, path, value) {
            var i;
            var node = data;
            var length = path.length;

            for (i = 0; i < length - 1; i++) {
                if (!node[path[i]]) {
                    node[path[i]] = {};
                }
                node = node[path[i]];
            }
            node[path[i]] = value;
        }
        set(data, [instance.cldr.attributes.bundle].concat(path), message);
        Globalize.loadMessages(data);
    }

    // Set path.
    if (args[0]) {
        path = args[0].split("/");
    } else {
        defaultMessage = getDefaultMessage(children);
        args[0] = sanitizePath(defaultMessage);
        path = [args[0]];
    }

    // Scope path.
    if (scope) {
        args[0] = scope + "/" + args[0];
        path = scope.split("/").concat(path);
    }

    // Development mode only.
    if (instance.cldr) {
        if (!getMessage()) {
            defaultMessage = defaultMessage || getDefaultMessage(children);
            setMessage(defaultMessage);
        }
    }

}

function sanitizePath(pathString) {
    return pathString.trim().replace(/\{/g, "(").replace(/\}/g, ")").replace(/\//g, "|").replace(/\n/g, " ").replace(/ +/g, " ").replace(/"/g, "'");
}

// Overload Globalize's `.formatMessage` to allow default message.
var messageFormatterSuper = Globalize.messageFormatter;
Globalize.messageFormatter =
Globalize.prototype.messageFormatter = function(pathOrMessage) {
    var aux = {};
    var sanitizedPath = sanitizePath(pathOrMessage);
    if (this.cldr && this.cldr.get(["globalize-messages/{bundle}", sanitizedPath]) === undefined) {
        aux[this.cldr.attributes.bundle] = {};
        aux[this.cldr.attributes.bundle][sanitizedPath] = pathOrMessage;
        Globalize.loadMessages(aux);
    }
    arguments[0] = sanitizedPath;
    return messageFormatterSuper.apply(this, arguments);
};

export default React.createClass(generator("formatMessage", ["path", "variables"], {
    beforeFormat: function() {
        messageSetup(this.props, this.instance, this.args);
    }
}));
