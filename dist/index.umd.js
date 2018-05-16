(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('globalize')) :
	typeof define === 'function' && define.amd ? define(['react', 'globalize'], factory) :
	(global['react-globalize'] = factory(global.React,global.Globalize));
}(this, (function (React,Globalize) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;
Globalize = Globalize && Globalize.hasOwnProperty('default') ? Globalize['default'] : Globalize;

function alwaysArray(stringOrArray) {
    return Array.isArray(stringOrArray) ? stringOrArray : stringOrArray ? [stringOrArray] : [];
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var commonPropNames = ["elements", "locale"];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function omit(set) {
    return function (element) {
        return set.indexOf(element) === -1;
    };
}

function generator(fn, localPropNames, options) {
    var _class, _temp;

    options = options || {};
    var Fn = capitalizeFirstLetter(fn);
    var beforeFormat = options.beforeFormat || function () {};
    var afterFormat = options.afterFormat || function (props, formattedValue) {
        return formattedValue;
    };
    var globalizePropNames = commonPropNames.concat(localPropNames);

    return _temp = _class = function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
            key: "componentWillMount",
            // eslint-disable-line no-undef

            value: function componentWillMount() {
                this.setup(this.props);
            }
        }, {
            key: "componentWillReceiveProps",
            value: function componentWillReceiveProps(nextProps) {
                this.setup(nextProps);
            }
        }, {
            key: "setup",
            value: function setup(props) {
                var _globalize;

                this.globalize = props.locale ? Globalize(props.locale) : Globalize;
                this.domProps = Object.keys(props).filter(omit(globalizePropNames)).reduce(function (memo, propKey) {
                    memo[propKey] = props[propKey];
                    return memo;
                }, {});

                this.globalizePropValues = localPropNames.map(function (element) {
                    return props[element];
                });
                this.globalizePropValues[0] = props.children;

                beforeFormat.call(this, props);
                var formattedValue = (_globalize = this.globalize)[fn].apply(_globalize, _toConsumableArray(this.globalizePropValues));
                this.value = alwaysArray(afterFormat.call(this, props, formattedValue));
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement.apply(React, ["span", this.domProps].concat(_toConsumableArray(this.value)));
            }
        }]);

        return _class;
    }(React.Component), _class.displayName = Fn, _temp;
}

var FormatCurrency = generator("formatCurrency", ["value", "currency", "options"]);

var FormatDate = generator("formatDate", ["value", "options"]);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function messageSetup(globalize, props, globalizePropValues) {
    var defaultMessage;
    var children = props.children;
    var scope = props.scope;

    function getDefaultMessage(children) {
        if (typeof children === "string") {
            return children;
        } else {
            throw new Error("Invalid default message type `" + (typeof children === "undefined" ? "undefined" : _typeof(children)) + "`");
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
        var getMessage = function getMessage(globalize, path) {
            return globalize.cldr.get(["globalize-messages/{bundle}"].concat(path));
        };

        var setMessage = function setMessage(globalize, path, message) {
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

    function _replaceElements(format, elements) {
        if (typeof format !== "string") {
            throw new Error("Missing or invalid string `" + format + "` (" + (typeof format === "undefined" ? "undefined" : _typeof(format)) + ")");
        }
        if ((typeof elements === "undefined" ? "undefined" : _typeof(elements)) !== "object") {
            throw new Error("Missing or invalid elements `" + elements + "` (" + (typeof elements === "undefined" ? "undefined" : _typeof(elements)) + ")");
        }

        // Given [x, y, z], it returns [x, element, y, element, z].
        function spreadElementsInBetweenItems(array, element) {
            var getElement = typeof element === "function" ? element : function () {
                return element;
            };
            return array.slice(1).reduce(function (ret, item, i) {
                ret.push(getElement(i), item);
                return ret;
            }, [array[0]]);
        }

        function splice(sourceArray, start, deleteCount, itemsArray) {
            [].splice.apply(sourceArray, [start, deleteCount].concat(itemsArray));
        }

        return Object.keys(elements).reduce(function (nodes, key) {
            var element = elements[key];

            // Insert array into the correct ret position.
            function replaceNode(array, i) {
                splice(nodes, i, 1, array);
            }

            var _loop = function _loop(i) {
                var node = nodes[i];
                if (typeof node !== "string") {
                    return "continue"; // eslint-disable-line no-continue
                }

                // Empty tags, e.g., `[foo/]`.
                var aux = node.split("[" + key + "/]");
                if (aux.length > 1) {
                    aux = spreadElementsInBetweenItems(aux, element);
                    replaceNode(aux, i);
                    return "continue"; // eslint-disable-line no-continue
                }

                // Start-end tags, e.g., `[foo]content[/foo]`.
                var regexp = new RegExp("\\[" + key + "\\][\\s\\S]*?\\[\\/" + key + "\\]", "g");
                var regexp2 = new RegExp("\\[" + key + "\\]([\\s\\S]*?)\\[\\/" + key + "\\]");
                aux = node.split(regexp);
                if (aux.length > 1) {
                    var contents = node.match(regexp).map(function (content) {
                        return content.replace(regexp2, "$1");
                    });
                    aux = spreadElementsInBetweenItems(aux, function (idx) {
                        return React.cloneElement(element, {}, contents[idx]);
                    });
                    replaceNode(aux, i);
                }
            };

            for (var i = 0; i < nodes.length; i += 1) {
                var _ret = _loop(i);

                if (_ret === "continue") continue;
            }

            return nodes;
        }, [format]);
    }

    // Elements replacement.
    if (elements) {
        formatted = _replaceElements(formatted, elements);
    }

    return formatted;
}

function sanitizePath(pathString) {
    return pathString.trim().replace(/\{/g, "(").replace(/\}/g, ")").replace(/\//g, "|").replace(/\n/g, " ").replace(/ +/g, " ").replace(/"/g, "'");
}

// Overload Globalize's `.formatMessage` to allow default message.
var globalizeMessageFormatter = Globalize.messageFormatter;
Globalize.messageFormatter = Globalize.prototype.messageFormatter = function (pathOrMessage) {
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

var FormatMessage = generator("formatMessage", ["path", "variables"], {
    beforeFormat: function beforeFormat(props) {
        messageSetup(this.globalize, props, this.globalizePropValues);
    },
    afterFormat: function afterFormat(props, formattedValue) {
        return replaceElements(props, formattedValue);
    }
});

var FormatNumber = generator("formatNumber", ["value", "options"]);

var FormatRelativeTime = generator("formatRelativeTime", ["value", "unit", "options"]);

var index = {
    FormatCurrency: FormatCurrency,
    FormatDate: FormatDate,
    FormatMessage: FormatMessage,
    FormatNumber: FormatNumber,
    FormatRelativeTime: FormatRelativeTime
};

return index;

})));
