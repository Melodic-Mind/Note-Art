import {MusicTheoryStructures as mts} from '../'

/**
 * Validate duration.
 */
export class DurationRule {
    static validate(duration, backwards = false) {
        return Object.keys(mts.noteDurations()).includes(duration)
    }
}
