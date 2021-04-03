import { PitchClassRule } from '../../src/validation'

describe('Pitch Class Rule', () => {
  it('should return true when valid', () => {
    expect(PitchClassRule.exists('C')).to.be.true
    expect(PitchClassRule.exists('c')).to.be.true
    expect(PitchClassRule.exists('c#')).to.be.true
    expect(PitchClassRule.exists('cbb')).to.be.true
    expect(PitchClassRule.exists('ax#')).to.be.true
    expect(PitchClassRule.exists('axx')).to.be.true
    expect(PitchClassRule.exists('bbbbbbb')).to.be.true
    expect(PitchClassRule.exists('F#')).to.be.true
  })

  it('should throw an error when a pitch class is not valid', () => {
    expect(PitchClassRule.exists('q')).to.be.false
    expect(PitchClassRule.exists('ab#')).to.be.false
    expect(PitchClassRule.exists('b##')).to.be.false
    expect(PitchClassRule.exists('F#b')).to.be.false
    expect(PitchClassRule.exists('gbbbbbx')).to.be.false
    expect(PitchClassRule.exists('axxxb')).to.be.false
    expect(PitchClassRule.exists('axbb')).to.be.false
  })
})
