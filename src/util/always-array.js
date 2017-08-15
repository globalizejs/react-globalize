export default function alwaysArray(stringOrArray) {
    return Array.isArray(stringOrArray) ? stringOrArray : stringOrArray ? [stringOrArray] : [];
}
