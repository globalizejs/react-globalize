import Globalize from "globalize";
import React from "react";
import PropTypes from "prop-types";
import generator from "./generator";

function sanitizePath(pathString) {
    return pathString.trim()
        .replace(/\{/g, "(")
        .replace(/\}/g, ")")
        .replace(/\//g, "|")
        .replace(/\n/g, " ")
        .replace(/ +/g, " ")
        .replace(/"/g, "'");
}

function messageSetup(globalize, props, globalizePropValues) {
    let defaultMessage;
    const children = props.children;
    const scope = props.scope;

    function getDefaultMessage(childs) {
        if (typeof childs === "string") {
            return childs;
        }
        throw new Error(`Invalid default message type \`${typeof childs}\``);
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
        globalizePropValues[0] = `${scope}/${globalizePropValues[0]}`; // eslint-disable-line no-param-reassign
    }

    // Development mode only.
    if (process.env.NODE_ENV !== "production") {
        const pathProp = props.path ? props.path.split("/") : [globalizePropValues[0]];
        const getMessage = p => globalize.cldr.get(["globalize-messages/{bundle}"].concat(p));

        const setMessage = (p, message) => {
            const data = {};
            function set(d, path, value) {
                let i;
                let node = d;
                const length = path.length;

                for (i = 0; i < length - 1; i += 1) {
                    if (!node[path[i]]) {
                        node[path[i]] = {};
                    }
                    node = node[path[i]];
                }
                node[path[i]] = value;
            }
            set(data, [globalize.cldr.attributes.bundle].concat(p), message);
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
    const elementsProp = props.elements;

    // eslint-disable-next-line no-underscore-dangle
    function _replaceElements(format, elements) {
        if (typeof format !== "string") {
            throw new Error(`Missing or invalid string \`${format}\` (${typeof format})`);
        }
        if (typeof elements !== "object") {
            throw new Error(`Missing or invalid elements \`${elements}\` (${typeof elements})`);
        }

        // Given [x, y, z], it returns [x, element, y, element, z].
        function spreadElementsInBetweenItems(array, getElement) {
            return array.slice(1).reduce(
                (nodes, item, i) => [...nodes, getElement(i), item],
                [array[0]]);
        }

        return Object.keys(elements).reduce((nodes, key) => {
            const element = elements[key];
            // flatMap...
            return Array.prototype.concat.apply([], nodes.map((node) => {
                if (typeof node === "string") {
                    // Empty tags, e.g., `[foo/]`.
                    let aux = node.split(`[${key}/]`);
                    if (aux.length > 1) {
                        return spreadElementsInBetweenItems(aux, () => element);
                    }

                    // Start-end tags, e.g., `[foo]content[/foo]`.
                    const regexp = new RegExp(`\\[${key}\\][\\s\\S]*?\\[\\/${key}\\]`, "g");
                    const regexp2 = new RegExp(`\\[${key}\\]([\\s\\S]*?)\\[\\/${key}\\]`);
                    aux = node.split(regexp);
                    if (aux.length > 1) {
                        const contents = node.match(regexp).map(content => content.replace(regexp2, "$1"));
                        return spreadElementsInBetweenItems(
                            aux,
                            idx => React.cloneElement(element, {}, contents[idx]),
                        );
                    }
                }
                return node;
            }));
        }, [format]);
    }

    // Elements replacement.
    if (elementsProp) {
        return _replaceElements(formatted, elementsProp);
    }
    return formatted;
}
replaceElements.propTypes = {
    elements: PropTypes.shape.isRequired,
};

// Overload Globalize's `.formatMessage` to allow default message.
const globalizeMessageFormatter = Globalize.messageFormatter;
// eslint-disable-next-line no-multi-assign, max-len, func-names
Globalize.messageFormatter = Globalize.prototype.messageFormatter = function (pathOrMessage, ...rest) {
    let aux = {};
    const sanitizedPath = sanitizePath(pathOrMessage);
    const args = [pathOrMessage, ...rest];

    // Globalize runtime
    if (!this.cldr) {
        // On runtime, the only way for deciding between using sanitizedPath or
        // pathOrMessage as path is by checking which formatter exists.
        args[0] = sanitizedPath;
        aux = globalizeMessageFormatter.apply(this, args);
        args[0] = pathOrMessage;
        return aux || globalizeMessageFormatter.apply(this, args);
    }

    let sanitizedPathExists = this.cldr.get(["globalize-messages/{bundle}", sanitizedPath]) !== undefined;
    const pathExists = this.cldr.get(["globalize-messages/{bundle}", pathOrMessage]) !== undefined;

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

export default generator("formatMessage", ["path", "variables"], {
    beforeFormat: function messageBeforeFormat(props) {
        messageSetup(this.globalize, props, this.globalizePropValues);
    },
    afterFormat: function messageAfterFormat(formattedValue) {
        return replaceElements(this.props, formattedValue);
    },
});
