import Instrument from '../instruments/Instrument'

/**
 * @class Piano
 * @classdesc Represents a Piano.
 * @extends Instrument
 */
export default class Piano extends Instrument {
  constructor() {
    super()
    this.init()
  }

  static get name() {
    return 'Piano'
  }

  /** @inheritDoc */
  generatePath(note) {
    return `${Instrument.server}${Instrument.instrumentPath}/${note}.mp3`
  }


  /**
   * @inheritDoc
   */
  toString() {
    return 'piano'
  }
}
