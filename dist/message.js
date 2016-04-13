'use strict';

var Globalize = require('globalize');
var React = require('react');
var generator = require('./generator');



function messageSetup(componentProps, instance, args) {
    var defaultMessage, path;
    var children = componentProps.children;
    var scope = componentProps.scope;
    var pathProperty = componentProps.path;

    function getDefaultMessage(children) {
        if (typeof children === "string") {
            return children;
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

    // Set path - path as props supercedes default value.
    if (pathProperty) {
        // Override generator assumption. The generator assumes the args[0]
        // (path) and props.children to be mutually exclusive, but this isn't
        // true here for messages. Because, it's possible to use props.path (for
        // path) and props.children for defaultMessage, which are two different
        // variables.
        args[0] = pathProperty;
        path = pathProperty.split("/");
    } else {
        // Although the generator had already set args[0] (path) as
        // props.children, here its type is checked and its value is sanitized.
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

function replaceElements(componentProps, formatted) {
    var elements = componentProps.elements;

    function _replaceElements(string, elements) {
        if (typeof string !== "string") {
            throw new Error("missing or invalid string `" + string + "` (" + typeof string + ")");
        }
        if (typeof elements !== "object") {
            throw new Error("missing or invalid elements `" + elements + "` (" + typeof elements + ")");
        }

        // Given [x, y, z], it returns [x, element, y, element, z].
        function spreadElementsInBetweenItems(array, element) {
            var getElement = typeof element === "function" ? element : function() {
                return element;
            };
            return array.slice(1).reduce(function(ret, item, i) {
                ret.push(getElement(i), item);
                return ret;
            }, [array[0]]);
        }

        function splice(sourceArray, start, deleteCount, itemsArray) {
            [].splice.apply(sourceArray, [start, deleteCount].concat(itemsArray));
        }

        return Object.keys(elements).reduce(function(ret, key) {
            var element = elements[key];

            ret.forEach(function(string, i) {
                var aux, contents, regexp, regexp2;

                // Insert array into the correct ret position.
                function replaceRetItem(array) {
                    splice(ret, i, 1, array);
                }

                if (typeof string !== "string") {
                    return; // continue;
                }

                // Empty tags, e.g., `[foo/]`.
                aux = string.split("[" + key + "/]");
                if (aux.length > 1) {
                    aux = spreadElementsInBetweenItems(aux, element);
                    replaceRetItem(aux);
                    return; // continue;
                }

                // Start-end tags, e.g., `[foo]content[/foo]`.
                regexp = new RegExp("\\[" + key + "\\][\\s\\S]*?\\[\\/" + key + "\\]", "g");
                regexp2 = new RegExp("\\[" + key + "\\]([\\s\\S]*?)\\[\\/" + key + "\\]");
                aux = string.split(regexp);
                if (aux.length > 1) {
                    contents = string.match(regexp).map(function(content) {
                        return content.replace(regexp2, "$1");
                    });
                    aux = spreadElementsInBetweenItems(aux, function(i) {
                        return React.cloneElement(element, {}, contents[i]);
                    });
                    replaceRetItem(aux);
                }
            });

            return ret;
        }, [string]);
    }


    // Elements replacement.
    if (elements) {
        formatted = React.DOM.span.apply(React.DOM.span, [{}].concat(_replaceElements(formatted, elements)));
    }

    return formatted;
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

    // Globalize runtime
    if (!this.cldr) {
        // On runtime, the only way for deciding between using sanitizedPath or
        // pathOrMessage as path is by checking which formatter exists.
        arguments[0] = sanitizedPath;
        aux = messageFormatterSuper.apply(this, arguments);
        arguments[0] = pathOrMessage;
        return aux || messageFormatterSuper.apply(this, arguments);
    }

    var sanitizedPathExists = this.cldr.get(["globalize-messages/{bundle}", sanitizedPath]) !== undefined;
    var pathExists = this.cldr.get(["globalize-messages/{bundle}", pathOrMessage]) !== undefined;

    // Want to distinguish between default message and path value - just checking
    // for sanitizedPath won't be enough, because sanitizedPath !== pathOrMessage
    // for paths like "salutations/hi".
    if (!sanitizedPathExists && !pathExists) {
        aux[this.cldr.attributes.bundle] = {};
        aux[this.cldr.attributes.bundle][sanitizedPath] = pathOrMessage;
        Globalize.loadMessages(aux);
        sanitizedPathExists = true;
    }

    arguments[0] = sanitizedPathExists ? sanitizedPath : pathOrMessage;
    return messageFormatterSuper.apply(this, arguments);
};

module.exports = React.createClass(generator("formatMessage", ["path", "variables"], {
    beforeFormat: function() {
        messageSetup(this.props, this.instance, this.args);
    },
    afterFormat: function(formattedValue) {
        return replaceElements(this.props, formattedValue);
    }
}));