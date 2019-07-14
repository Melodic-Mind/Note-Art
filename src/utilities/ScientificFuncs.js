const semitone = Math.pow(2, 1 / 12)

/**
 * Calculate the frequency of a note by its octave and index out of all notes(c, c#, etc...).
 * @returns {Number}
 */
function freqFromPitch(pitch) {
    const oct = pitch.octave - 4 //calculate octave difference
    return Math.pow(semitone, pitch.classIndex - 9 + oct * 12) * 440
}

/**
 * Generate real number from frequency.
 * @param frequency
 * @returns {number}
 */
function realNumberFromFreq(frequency) {
    return Math.round(69 + 12 * Math.log2(frequency / 440))
}

/**
 * Generate frequency from real number.
 * @param realNumber
 * @returns {Number}
 */
function freqFromRealNumber(realNumber) {
    return 440 * (Math.pow(2, (realNumber - 69) / 12))
}

export {
    freqFromPitch,
    realNumberFromFreq,
    freqFromRealNumber,
}
