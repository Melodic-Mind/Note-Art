import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'

/**
 * Validate duration.
 */
export default class DurationRule {
  static validate(duration) {
    return Object.keys(mts.noteDurations).includes(duration)
  }
}
