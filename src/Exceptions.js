export class DataNotFound extends Error {
    constructor(data) {
        super(`Couldn't find data: ${data}.`)
    }
}

export class MissingInformation extends Error {
    constructor(type) {
        super(`Please provide ${type} name or pattern(in semi-tones).`)
    }
}

export class InvalidInput extends Error {
    constructor(input) {
        super(`Invalid input - ${input}.`)
    }
}