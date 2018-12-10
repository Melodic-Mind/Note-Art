export class NotAChordException extends Error {
    constructor(chord_type) {
        super(`${chord_type} is not a chord type.`)
    }
}