import {Constants } from '../resources/Constants'

/**
 * Validate duration.
 */
export default class DurationRule {
  static validate(duration) {
    return Object.keys(Constants.noteDurations).includes(duration)
  }
}
