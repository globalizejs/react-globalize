define(['globalize', 'react', './generator', 'globalize/message', 'globalize/plural'], function (Globalize, React, generator) {

    'use strict';

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
        if (this.cldr && this.cldr.get(["globalize-messages/{bundle}", sanitizedPath]) === undefined) {
            aux[this.cldr.attributes.bundle] = {};
            aux[this.cldr.attributes.bundle][sanitizedPath] = pathOrMessage;
            Globalize.loadMessages(aux);
        }
        arguments[0] = sanitizedPath;
        return messageFormatterSuper.apply(this, arguments);
    };


    return React.createClass(generator("formatMessage", ["path", "variables"], {
        beforeFormat: function() {
            messageSetup(this.props, this.instance, this.args);
        },
        afterFormat: function(formattedValue) {
            return replaceElements(this.props, formattedValue);
        }
    }));

});