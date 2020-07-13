import { PatternRule }  from '../../src'
import { InvalidInput } from '../../src/Exceptions'

describe( 'Pattern Rule', () => {
  describe( '#isPattern', () => {
    it( 'should throw invalid-input when called with something other than array', () => {
      expect( () => PatternRule.isPattern( 'NOT ARRAY' ) ).to.throw( InvalidInput )
    } )

    it( 'should throw invalid-input when called with array that contains something other than int', () => {
      expect( () => PatternRule.isPattern( [ 1, 2, 'OMG' ] ) ).to.throw( InvalidInput )
    } )

    it( 'returns true when pattern is valid', () => {
      expect( PatternRule.isPattern( [ 1, 2, 3 ] ) ).to.be.true
    } )
  } )
} )
