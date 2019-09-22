import Instrument from './Instrument'

/**
 * @class Cord
 * @extends Instrument
 *
 * @classdesc A cord which represents a cord as part of a stringed instrument.
 * @param base
 * @param range
 * @param cordNumber
 */
export default class Cord extends Instrument {
  constructor(base, range, cordNumber) {
    super()
    this.cordNumber = cordNumber
    this.init(base, range)
  }

    static get name() {
    return 'Cord'
  }

  /**
   * @inheritDoc
   */
  generatePath(note) {
    const set  = Instrument.normalizeSet(note.pitchClass, note.classSet)
    const file = `${set}${note.octave}`

    return `${Instrument.server}${Cord.instrumentPath}/${this.cordNumber}/${file}.mp3`
  }

  /**
   *
   * @param fret
   * @returns {K}
   */
  fret(fret) {
    return Array.from(this.notes.keys())[fret]
  }


  /**
   * @inheritDoc
   */
  toString() {
    return 'cord'
  }
}
