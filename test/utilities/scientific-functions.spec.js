import * as funcs from '../../src/utilities/ScientificFunctions'

describe('Scientific functions', () => {
  it('#freqFromPitch', () => {
    const note   = 'A4'
    const pitch2 = 'E5'
    expect(funcs.freqFromPitch(note)).to.eql(440)
    expect(Math.ceil(funcs.freqFromPitch(pitch2))).to.eql(660)
  })

  it('#freqToMidi', () => {
    expect(funcs.freqToMidi(440)).to.eql(69)
    expect(funcs.freqToMidi(428)).to.eql(69)
  })

  it('#midiToFreq', () => {
    expect(funcs.midiToFreq(69)).to.eql(440)
    expect(funcs.midiToFreq(57)).to.eql(220)
  })
})
