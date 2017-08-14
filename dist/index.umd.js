(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('globalize'), require('prop-types')) :
	typeof define === 'function' && define.amd ? define(['react', 'globalize', 'prop-types'], factory) :
	(global['react-globalize'] = factory(global.React,global.Globalize,global.PropTypes));
}(this, (function (React,Globalize,PropTypes) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;
Globalize = Globalize && Globalize.hasOwnProperty('default') ? Globalize['default'] : Globalize;
PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

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





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



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



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var commonPropNames = ["elements", "locale"];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function omit(set$$1) {
    return function omitElem(element) {
        return set$$1.indexOf(element) === -1;
    };
}

function generator(fn, localPropNames, options) {
    var _class, _temp;

    var opts = options || {};
    var Fn = capitalizeFirstLetter(fn);
    var beforeFormat = opts.beforeFormat || function () {};
    var afterFormat = opts.afterFormat || function (formattedValue) {
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
                var _globalize;

                this.globalize = props.locale ? Globalize(props.locale) : Globalize;
                this.domProps = Object.keys(props).filter(omit(globalizePropNames)).reduce(function (memo, propKey) {
                    return _extends({}, memo, defineProperty({}, propKey, props[propKey]));
                }, {});

                this.globalizePropValues = localPropNames.map(function (element) {
                    return props[element];
                });
                this.globalizePropValues[0] = props.children;

                beforeFormat.call(this, props);
                var formattedValue = (_globalize = this.globalize)[fn].apply(_globalize, toConsumableArray(this.globalizePropValues));
                this.value = afterFormat.call(this, formattedValue);
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement(
                    "span",
                    this.domProps,
                    this.value
                );
            }
        }]);
        return _class;
    }(React.Component), _class.displayName = Fn, _temp;
}

var FormatCurrency = generator("formatCurrency", ["value", "currency", "options"]);

var FormatDate = generator("formatDate", ["value", "options"]);

function sanitizePath(pathString) {
    return pathString.trim().replace(/\{/g, "(").replace(/\}/g, ")").replace(/\//g, "|").replace(/\n/g, " ").replace(/ +/g, " ").replace(/"/g, "'");
}

function messageSetup(globalize, props, globalizePropValues) {
    var defaultMessage = void 0;
    var children = props.children;
    var scope = props.scope;

    function getDefaultMessage(childs) {
        if (typeof childs === "string") {
            return childs;
        }
        throw new Error("Invalid default message type `" + (typeof childs === "undefined" ? "undefined" : _typeof(childs)) + "`");
    }

    // Set path - path as props supercedes default value.
    if (props.path) {
        // Override generator assumption. The generator assumes the globalizePropValues[0]
        // (path) and props.children to be mutually exclusive, but this isn't
        // true here for messages. Because, it's possible to use props.path (for
        // path) and props.children for defaultMessage, which are two different
        // variables.        
        globalizePropValues[0] = props.path; // eslint-disable-line no-param-reassign
    } else {
        // Although the generator had already set globalizePropValues[0] (path) as
        // props.children, here its type is checked and its value is sanitized.
        defaultMessage = getDefaultMessage(children);
        // eslint-disable-next-line no-param-reassign
        globalizePropValues[0] = sanitizePath(defaultMessage);
    }

    // Scope path.
    if (scope) {
        globalizePropValues[0] = scope + "/" + globalizePropValues[0]; // eslint-disable-line no-param-reassign
    }

    // Development mode only.
    if (process.env.NODE_ENV !== "production") {
        var pathProp = props.path ? props.path.split("/") : [globalizePropValues[0]];
        var getMessage = function getMessage(p) {
            return globalize.cldr.get(["globalize-messages/{bundle}"].concat(p));
        };

        var setMessage = function setMessage(p, message) {
            var data = {};
            function set$$1(d, path, value) {
                var i = void 0;
                var node = d;
                var length = path.length;

                for (i = 0; i < length - 1; i += 1) {
                    if (!node[path[i]]) {
                        node[path[i]] = {};
                    }
                    node = node[path[i]];
                }
                node[path[i]] = value;
            }
            set$$1(data, [globalize.cldr.attributes.bundle].concat(p), message);
            Globalize.loadMessages(data);
        };

        if (globalize.cldr) {
            if (!getMessage(pathProp)) {
                defaultMessage = defaultMessage || getDefaultMessage(children);
                setMessage(pathProp, defaultMessage);
            }
        }
    }
}

function replaceElements(props, formatted) {
    var elementsProp = props.elements;

    // eslint-disable-next-line no-underscore-dangle
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

            ret.forEach(function (str, i) {
                // Insert array into the correct ret position.
                function replaceRetItem(array) {
                    splice(ret, i, 1, array);
                }

                if (typeof str !== "string") {
                    return; // continue;
                }

                // Empty tags, e.g., `[foo/]`.
                var aux = str.split("[" + key + "/]");
                if (aux.length > 1) {
                    aux = spreadElementsInBetweenItems(aux, element);
                    replaceRetItem(aux);
                    return; // continue;
                }

                // Start-end tags, e.g., `[foo]content[/foo]`.
                var regexp = new RegExp("\\[" + key + "\\][\\s\\S]*?\\[\\/" + key + "\\]", "g");
                var regexp2 = new RegExp("\\[" + key + "\\]([\\s\\S]*?)\\[\\/" + key + "\\]");
                aux = str.split(regexp);
                if (aux.length > 1) {
                    var contents = str.match(regexp).map(function (content) {
                        return content.replace(regexp2, "$1");
                    });
                    aux = spreadElementsInBetweenItems(aux, function (idx) {
                        return React.cloneElement(element, {}, contents[idx]);
                    });
                    replaceRetItem(aux);
                }
            });

            return ret;
        }, [string]);
    }

    // Elements replacement.
    if (elementsProp) {
        // const components = _replaceElements(formatted, elementsProp);
        return React.createElement.apply(React, ["span", {}].concat(toConsumableArray(_replaceElements(formatted, elementsProp))));
    }
    return formatted;
}
replaceElements.propTypes = {
    elements: PropTypes.shape.isRequired
};

// Overload Globalize's `.formatMessage` to allow default message.
var globalizeMessageFormatter = Globalize.messageFormatter;
// eslint-disable-next-line no-multi-assign, max-len, func-names
Globalize.messageFormatter = Globalize.prototype.messageFormatter = function (pathOrMessage) {
    var aux = {};
    var sanitizedPath = sanitizePath(pathOrMessage);

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
    }

    var args = [pathOrMessage].concat(rest);

    // Globalize runtime
    if (!this.cldr) {
        // On runtime, the only way for deciding between using sanitizedPath or
        // pathOrMessage as path is by checking which formatter exists.
        args[0] = sanitizedPath;
        aux = globalizeMessageFormatter.apply(this, args);
        args[0] = pathOrMessage;
        return aux || globalizeMessageFormatter.apply(this, args);
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

    args[0] = sanitizedPathExists ? sanitizedPath : pathOrMessage;
    return globalizeMessageFormatter.apply(this, args);
};

var FormatMessage = generator("formatMessage", ["path", "variables"], {
    beforeFormat: function messageBeforeFormat(props) {
        messageSetup(this.globalize, props, this.globalizePropValues);
    },
    afterFormat: function messageAfterFormat(formattedValue) {
        return replaceElements(this.props, formattedValue);
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
