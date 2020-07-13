function assertInterval ( obj, interval, expectedInstance ) {
  it( `${ obj.raw } with interval ${ interval } to ${ expectedInstance }`, () => {
    expect( obj.interval( Number( interval ) ) ).to.eql( expectedInstance )
  } )
}

export function testIntervals ( instance, stub ) {
  Object.entries( stub ).forEach( ( [ interval, note ] ) => {
    assertInterval( instance, interval, note )
  } )
}
