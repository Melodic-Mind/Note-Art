/**
 * Transforms the first letter of a string to upper case.
 * @param {String} str String to transform
 * @returns {String}
 */
export function firstToUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Returns a number formatted to show only 2 digits after the decimal point.
 * @param {Number} num
 * @returns {Number}
 */
export const twoDigitFormat = num => Number(Number.parseFloat(num).toFixed(2))

/**
 * Builds a formatted string out of an array with items.
 * @param {Array} data
 * @returns {string}
 */
export function buildString(data) {
    let s = ''
    data.forEach(item => s += item.toString() + ', ')
    return s.slice(0, s.length - 2)
}

/**
 * Gets an array and 2 indexes and returns a new array with those members indexes switched.
 * @param {Array} arr
 * @param {number} i1
 * @param {number} i2
 * @returns {Array}
 */
export function switchMembers([...arr], i1, i2) {
    const tmp = arr[i1]
    arr[i1]   = arr[i2]
    arr[i2]   = tmp
    return arr
}

export function reArrangeArray([...array], index) {
    const tmp = []
    let i     = 0

    while (i < index) {
        tmp.push(array.shift())
        ++i
    }

    return [...array, ...tmp]
}
