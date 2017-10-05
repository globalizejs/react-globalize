import Globalize from "globalize";
import React from "react";
import generator from "./generator";
import "globalize/message";
import "globalize/plural";

function messageSetup(globalize, props, globalizePropValues) {
    var defaultMessage;
    var children = props.children;
    var scope = props.scope;

    function getDefaultMessage(children) {
        if (typeof children === "string") {
            return children;
        } else {
            throw new Error("Invalid default message type `" + typeof children + "`");
        }
    }

    // Set path - path as props supercedes default value.
    if (props.path) {
        // Override generator assumption. The generator assumes the globalizePropValues[0]
        // (path) and props.children to be mutually exclusive, but this isn't
        // true here for messages. Because, it's possible to use props.path (for
        // path) and props.children for defaultMessage, which are two different
        // variables.
        globalizePropValues[0] = props.path;
    } else {
        // Although the generator had already set globalizePropValues[0] (path) as
        // props.children, here its type is checked and its value is sanitized.
        defaultMessage = getDefaultMessage(children);
        globalizePropValues[0] = sanitizePath(defaultMessage);
    }

    // Scope path.
    if (scope) {
        globalizePropValues[0] = scope + "/" + globalizePropValues[0];
    }

    // Development mode only.
    if (process.env.NODE_ENV !== "production") {
        var path = props.path ? props.path.split("/") : [globalizePropValues[0]];
        var getMessage = function(globalize, path) {
            return globalize.cldr.get(["globalize-messages/{bundle}"].concat(path));
        };

        var setMessage = function(globalize, path, message) {
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
            set(data, [globalize.cldr.attributes.bundle].concat(path), message);
            Globalize.loadMessages(data);
        };

        if (globalize.cldr) {
            if (!getMessage(globalize, path)) {
                defaultMessage = defaultMessage || getDefaultMessage(children);
                setMessage(globalize, path, defaultMessage);
            }
        }
    }
}

function replaceElements(props, formatted) {
    var elements = props.elements;

    function _replaceElements(string, elements) {
        if (typeof string !== "string") {
            throw new Error("Missing or invalid string `" + string + "` (" + typeof string + ")");
        }
        if (typeof elements !== "object") {
            throw new Error("Missing or invalid elements `" + elements + "` (" + typeof elements + ")");
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
        return _replaceElements(formatted, elements);
    }

    return formatted;
}

function sanitizePath(pathString) {
    return pathString.trim().replace(/\{/g, "(").replace(/\}/g, ")").replace(/\//g, "|").replace(/\n/g, " ").replace(/ +/g, " ").replace(/"/g, "'");
}

// Overload Globalize's `.formatMessage` to allow default message.
var globalizeMessageFormatter = Globalize.messageFormatter;
Globalize.messageFormatter = Globalize.prototype.messageFormatter = function(pathOrMessage) {
    var aux = {};
    var sanitizedPath = sanitizePath(pathOrMessage);

    // Globalize runtime
    if (!this.cldr) {
        // On runtime, the only way for deciding between using sanitizedPath or
        // pathOrMessage as path is by checking which formatter exists.
        arguments[0] = sanitizedPath;
        aux = globalizeMessageFormatter.apply(this, arguments);
        arguments[0] = pathOrMessage;
        return aux || globalizeMessageFormatter.apply(this, arguments);
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
    return globalizeMessageFormatter.apply(this, arguments);
};

export default generator("formatMessage", ["path", "variables"], {
    beforeFormat: function(props) {
        messageSetup(this.globalize, props, this.globalizePropValues);
    },
    afterFormat: function(formattedValue) {
        return replaceElements(this.props, formattedValue);
    }
});
