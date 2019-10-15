import RawHelper  from '../../src/utilities/RawHelper'

describe('#RawHelper', () => {
  describe('#pitchClassesToNotes', () => {
    it('calls super method with params', () => {
      expect(RawHelper.pitchClassesToNotes(['a', 'b'], 3)).to.eql(['A3', 'B3'])
    })
  })

  describe('#pitchClassesToPianoChordNotes', () => {
    it('calls super method with params', () => {
      expect(RawHelper.pitchClassesToPianoChordNotes(['a', 'c', 'g'], 3)).to.eql(['A3', 'C4', 'G4'])
    })
  })

  describe('#enharmonicPitchClass', () => {
    it('calls super method with params', () => {
      expect(RawHelper.enharmonicPitchClass('c#', 'g')).to.eql('Gbbbbbb')
    })
  })
})
