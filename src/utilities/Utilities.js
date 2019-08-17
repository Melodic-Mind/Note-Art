import {InvalidInput} from '../Exceptions'

/**
 * Transforms the first letter of a string to upper case.
 * @param {String} str String to transform
 * @returns {String}
 */
function firstToUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Returns a number formatted to show only 2 digits after the decimal point.
 * @param {Number} num
 * @returns {Number}
 */
const twoDigitFormat = num => Number(Number.parseFloat(num).toFixed(2))

/**
 * Builds a formatted string out of an array with items.
 * @param {Array} data
 * @returns {string}
 */
function buildString(data) {
    let s = ''
    data.forEach(item => s += item.toString() + ', ')
    return s.slice(0, s.length - 2)
}

/**
 * Validates an argument is an array, fails if not.
 * @throws InvalidInput
 * @param arg
 * @returns {boolean}
 */
function validateArray(arg) {
    if (!Array.isArray(arg)) {
        throw new InvalidInput(`expected ${arg} to be an array`)
    }
    return true
}

function isInstanceOf(instance, classToCheckFor) {
    if(instance instanceof classToCheckFor){
        return true
    }

    throw new InvalidInput(`${instance} is not an instance of ${classToCheckFor.name}`)
}

export {firstToUpper, twoDigitFormat, buildString, validateArray, isInstanceOf}
