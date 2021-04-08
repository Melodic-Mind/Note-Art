import { freqFromPitch, freqToMidi, midiToFreq } from '../../src'

describe('Scientific functions', () => {
  it('#freqFromPitch', () => {
    const note   = 'A4'
    const pitch2 = 'E5'
    expect(freqFromPitch(note)).to.eql(440)
    expect(Math.ceil(freqFromPitch(pitch2))).to.eql(660)
  })

  it('#freqToMidi', () => {
    expect(freqToMidi(440)).to.eql(69)
    expect(freqToMidi(428)).to.eql(69)
  })

  it('#midiToFreq', () => {
    expect(midiToFreq(69)).to.eql(440)
    expect(midiToFreq(57)).to.eql(220)
  })
})
