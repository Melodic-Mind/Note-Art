import {MusicTheoryStructures as mts} from '../'

export class DurationRule {
    static validate(duration) {
        return Object.keys(mts.noteDurations).includes(duration)
    }
}
