import {
  firstToUpper, twoDigitFormat, PitchClass, validateInstance, switchMembers, rearrangeArray, mapString, fitArrayToSize,
  longestArray,
}                       from '../../'
import { InvalidInput } from '../../Exceptions'

describe( 'general-functions', () => {
  it( '#firstToUpper', () => {
    const stub = 'Major'
    expect( firstToUpper( 'major' ) ).to.eql( stub )
  } )

  it( '#twoDigitFormat', () => {
    expect( twoDigitFormat( 1.213 ) ).to.eql( 1.21 )
  } )

  describe( '#switchMember', () => {
    it( 'should return a new array with the members at the indexes switched', () => {
      expect( switchMembers( [ 1, 2 ], 0, 1 ) ).to.eql( [ 2, 1 ] )
    } )
  } )

  describe( '#rearrangeArray', () => {
    it( 'should re-arrange an array', () => {
      expect( rearrangeArray( [ 1, 2, 3, 4 ], 1 ) ).to.eql( [ 2, 3, 4, 1 ] )
      expect( rearrangeArray( [ 1, 2, 3, 4, 5, 6 ], 3 ) ).to.eql( [ 4, 5, 6, 1, 2, 3 ] )
    } )
  } )

  describe( '#mapString', () => {
    it( 'reduces a string', () => {
      expect( mapString( 'A###', '##', 'x' ) ).to.equal( 'Ax#' )
    } )
  } )

  describe( '#fitArrayToSize', () => {
    it( 'should fit the array to the size with the elements', () => {
      expect( fitArrayToSize( [ 'a', 'b' ], 3 ) ).to.eql( [ 'a', 'b', 'a' ] )
    } )

    it( 'should simply return the array when the size is the same as the array length', () => {
      expect( fitArrayToSize( [ 'a', 'b' ], 2 ) ).to.eql( [ 'a', 'b' ] )
    } )

    it( 'should cut the array length when the size is smaller', () => {
      expect( fitArrayToSize( [ 'a', 'b' ], 1 ) ).to.eql( [ 'a' ] )
    } )
  } )

  describe( '#longestArray', () => {
    it( 'returns the longest array out of a matrix', () => {
      const stub = [ [ 1, 2, 3 ], [ 1, 2 ], [ 1, 2, 3, 4, 5 ] ]
      expect( longestArray( stub ) ).to.eql( stub[2] )
    } )

    it( 'throws an error when input is not matrix', () => {
      expect( () => longestArray( 'NOT MATRIX' ) ).to.throw( InvalidInput )
    } )

    it( 'throws an error when one of the matrix elements is not an array', () => {
      expect( () => longestArray( [ [ 1, 2 ]['omg'] ] ) ).to.throw( InvalidInput )
    } )
  } )
} )
