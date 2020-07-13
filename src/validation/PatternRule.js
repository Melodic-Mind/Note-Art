import { InvalidInput } from '../Exceptions'

export default class PatternRule {
  static isPattern ( array ) {
    PatternRule.isArray( array )
    const integers = array.every( n => parseInt( n ) == n )
    if ( !integers ) {
      throw new InvalidInput( '_ should be an array where each member is an integer.' )
    }

    return true
  }

  static isArray ( array ) {
    if ( !Array.isArray( array ) ) {
      throw new InvalidInput( 'expected _ to be an array' )
    }
  }
}
