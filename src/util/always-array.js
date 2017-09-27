export default function alwaysArray(stringOrArray) {
    // eslint-disable-next-line no-nested-ternary
    return Array.isArray(stringOrArray) ? stringOrArray : stringOrArray ? [stringOrArray] : [];
}
