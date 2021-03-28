import { Scale, PitchClass, Chord } from 'src'

describe( 'Scale', () => {

  let C_Major
  beforeEach( () => {
    C_Major = new Scale( new PitchClass( 'c' ), [ 2, 4, 5, 7, 9, 11 ] )
  } )

  it( '#properties', () => {
    const stub = [
      new PitchClass( 'c' ),
      new PitchClass( 'd' ),
      new PitchClass( 'e' ),
      new PitchClass( 'f' ),
      new PitchClass( 'g' ),
      new PitchClass( 'a' ),
      new PitchClass( 'b' ),
    ]

    expect( C_Major.pitchClasses ).to.eql( stub )
  } )

  it( '#degree', () => {
    expect( C_Major.degree( 1 ) ).to.eql( new PitchClass( 'c' ) )
  } )

  it( '#chord', () => {
    const stub = new Chord( new PitchClass( 'c' ), [ 4, 7 ] )
    expect( C_Major.chord( 1 ) ).to.eql( stub )
  } )

  describe( '#chords', () => {
    it( 'should have these chords with a C Major scale', () => {
      const stub = [
        new Chord( new PitchClass( 'c' ), [ 4, 7 ] ),
        new Chord( new PitchClass( 'd' ), [ 3, 7 ] ),
        new Chord( new PitchClass( 'e' ), [ 3, 7 ] ),
        new Chord( new PitchClass( 'f' ), [ 4, 7 ] ),
        new Chord( new PitchClass( 'g' ), [ 4, 7 ] ),
        new Chord( new PitchClass( 'a' ), [ 3, 7 ] ),
        new Chord( new PitchClass( 'b' ), [ 3, 6 ] ),
      ]
      expect( C_Major.chords() ).to.eql( stub )
    } )
  } )

  describe( '#seventhChords', () => {
    it( 'should have these seventh chords with a C Major scale', () => {
      const stub = [
        new Chord( new PitchClass( 'c' ), [ 4, 7, 11 ] ),
        new Chord( new PitchClass( 'd' ), [ 3, 7, 10 ] ),
        new Chord( new PitchClass( 'e' ), [ 3, 7, 10 ] ),
        new Chord( new PitchClass( 'f' ), [ 4, 7, 11 ] ),
        new Chord( new PitchClass( 'g' ), [ 4, 7, 10 ] ),
        new Chord( new PitchClass( 'a' ), [ 3, 7, 10 ] ),
        new Chord( new PitchClass( 'b' ), [ 3, 6, 10 ] ),
      ]
      expect( C_Major.chords( true ) ).to.eql( stub )
    } )
  } )

  describe( '#raw', () => {
    describe( 'scale with less than 7 pitch classes', () => {
      it( 'scale [1, 2, 4, 6, 7, 11]', () => {
        const scale = new Scale( new PitchClass( 'c' ), [ 1, 2, 4, 6, 7, 11 ] )
        expect( scale.raw ).to.eql( [ 'C', 'Db', 'Ebb', 'Fb', 'Gb', 'Abb', 'B' ] )
      } )
    } )

    describe( 'scale with more or less than 7', () => {
      it( 'scale [1, 2, 4]', () => {
        const scale = new Scale( new PitchClass( 'c' ), [ 1, 2, 4 ] )
        expect( scale.raw ).to.eql( [ 'C', 'Db', 'D', 'E' ] )
      } )

      it( 'scale [1, 2, 4]', () => {
        const scale = new Scale( new PitchClass( 'c' ), [ 1, 2, 3, 4, 6, 7, 9, 11 ] )
        expect( scale.raw ).to.eql( [ 'C', 'Db', 'D', 'Eb', 'E', 'Gb', 'G', 'A', 'B' ] )
      } )
    } )
  } )
} )
