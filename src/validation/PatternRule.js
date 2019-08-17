import {InvalidInput} from "../Exceptions";

export class PatternRule {
    static isPattern(array) {
        PatternRule.isArray(array)
        const pattern = array.every(member => parseInt(member) == member)
        if (!pattern) {
            throw new InvalidInput('_ should be an array where each member is an integer.')
        }

        return true
    }

    static isArray(array){
        if(!Array.isArray(array)){
            throw new InvalidInput('expected _ to be an array')
        }
    }
}