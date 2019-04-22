import {DataNotFound, InvalidInput, MissingInformation} from '../Exceptions'

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
 * Gets either a name, a pattern, or nothing.
 * checks which one it got
 * and tries to find it in the source.
 * @param {String} [name] name
 * @param {Array} [pattern] pattern
 * @param {Object} source the source to search in
 * @throws {MissingInformation}
 * @returns {Object}
 */
function findQuery(name, pattern, source) {
    if (source) {
        if (name) {
            return findQueryByString(source, 'Name', name)
        }
        if (Array.isArray(pattern)) {
            return findQueryByArray(source, 'Pattern', pattern)
        }
    }
    throw new MissingInformation('name or pattern')
}

/**
 * Retrieves data from resource by name.
 * @throws {DataNotFound}
 * @returns {Object}
 * @param source
 * @param key
 * @param query
 */
function findQueryByString(source, key, query) {
    const result = source.find(listing => listing[key] === query)
    if (!result) {
        throw new DataNotFound(query)
    }
    return result
}

/**
 * Retrieves data from resource by Array.
 * if not found returns object with
 * name: unknown
 * key: query
 * @param source
 * @param key
 * @param query
 * @returns {Object}
 */
function findQueryByArray(source, key, query) {
    const result = source.find(
        listing => JSON.stringify(JSON.parse(listing[key])) === JSON.stringify(query),
    )
    if (!result) {
        return {
            Chord:                'Unknown',
            Name:                 'Unknown',
            'Pattern(intervals)': 'Unknown',
            Pattern:              JSON.stringify(query),
        }
    }
    return result
}

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

export {firstToUpper, twoDigitFormat, findQuery, buildString, validateArray}
