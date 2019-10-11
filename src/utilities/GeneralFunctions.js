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
 * @param {number} num
 * @returns {Number}
 */
export function twoDigitFormat(num) {
  return Number(Number.parseFloat(num).toFixed(2))
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

/**
 * Returns a new array which starts from index, adds the rest of the members to it's end.
 * @param {Array} array Array to rearrange.
 * @param {number} index to arrange from.
 * @returns {Array}
 */
export function rearrangeArray([...array], index) {
  const tmp = []
  let i     = 0

  while (i < index) {
    tmp.push(array.shift())
    ++i
  }

  return [...array, ...tmp]
}

/**
 * Map a string substring to a different string.
 * @param {string} str String to reduce.
 * @param {string} toMap Substring to reduce.
 * @param {string} mapTo String to reduce to.
 * @returns {string}
 */
export function mapString(str, toMap, mapTo) {
  while (str.includes(toMap)) {
    for (let i = 0; i < str.length; ++i) {
      if (str.substr(i, toMap.length) === toMap) {
        str = `${str.slice(0, i)}${mapTo}${str.slice(i + toMap.length)}`
        break
      }
    }
  }

  return str
}


/** Function that count occurrences of a substring in a string.
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @returns {number}
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
export function occurrencesInString(string, subString) {
  string += ''
  subString += ''
  if (subString.length <= 0) {
    return (string.length + 1)
  }

  var n    = 0,
      pos  = 0,
      step = subString.length

  while (true) {
    pos = string.indexOf(subString, pos)
    if (pos >= 0) {
      ++n
      pos += step
    } else {
      break
    }
  }
  return n
}

export function checkString(str, char) {

}
