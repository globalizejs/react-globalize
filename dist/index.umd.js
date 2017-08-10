(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('globalize')) :
	typeof define === 'function' && define.amd ? define(['react', 'globalize'], factory) :
	(global['react-globalize'] = factory(global.React,global.Globalize));
}(this, (function (React,Globalize) { 'use strict';

React = React && 'default' in React ? React['default'] : React;
Globalize = Globalize && 'default' in Globalize ? Globalize['default'] : Globalize;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var commonPropNames = ["elements", "locale"];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function omit(set$$1) {
    return function (element) {
        return set$$1.indexOf(element) === -1;
    };
}

function generator(fn, localPropNames, options) {
    var _class, _temp;

    options = options || {};
    var Fn = capitalizeFirstLetter(fn);
    var beforeFormat = options.beforeFormat || function () {};
    var afterFormat = options.afterFormat || function (formattedValue) {
        return formattedValue;
    };
    var globalizePropNames = commonPropNames.concat(localPropNames);

    return _temp = _class = function (_React$Component) {
        inherits(_class, _React$Component);

        function _class() {
            classCallCheck(this, _class);
            return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        createClass(_class, [{
            key: "componentWillMount",
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
                var formattedValue = this.globalize[fn].apply(this.globalize, this.globalizePropValues);
                this.value = afterFormat.call(this, formattedValue);
            }
        }, {
            key: "render",
            value: function render() {
                return React.DOM.span(this.domProps, this.value);
            }
        }]);
        return _class;
    }(React.Component), _class.displayName = Fn, _temp;
}

//import "globalize/currency";

var FormatCurrency = generator("formatCurrency", ["value", "currency", "options"]);

//import "globalize/date";

var FormatDate = generator("formatDate", ["value", "options"]);

//import "globalize/message";
//import "globalize/plural";

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
            function set$$1(data, path, value) {
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
            set$$1(data, [globalize.cldr.attributes.bundle].concat(path), message);
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
            throw new Error("Missing or invalid string `" + string + "` (" + (typeof string === "undefined" ? "undefined" : _typeof(string)) + ")");
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

        return Object.keys(elements).reduce(function (ret, key) {
            var element = elements[key];

            ret.forEach(function (string, i) {
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
                    contents = string.match(regexp).map(function (content) {
                        return content.replace(regexp2, "$1");
                    });
                    aux = spreadElementsInBetweenItems(aux, function (i) {
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
    afterFormat: function afterFormat(formattedValue) {
        return replaceElements(this.props, formattedValue);
    }
});

//import "globalize/number";

var FormatNumber = generator("formatNumber", ["value", "options"]);

//import "globalize/relative-time";

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
