import { PitchClass }    from '../../'
import { InvalidInput }  from '../../Exceptions'
import { testIntervals } from '../Helpers'

describe('PitchClass', () => {
  describe('static methods', () => {
    it('#isFlat', () => {
      expect(PitchClass.isFlat('Db')).to.be.true
      expect(PitchClass.isFlat('C')).to.be.false
      expect(PitchClass.isFlat('C#')).to.be.false
    })

    it('#isSharp', () => {
      expect(PitchClass.isSharp('Db')).to.be.false
      expect(PitchClass.isSharp('C')).to.be.false
      expect(PitchClass.isSharp('C#')).to.be.true
    })

    describe('isPitchClass', () => {
      it('returns true when object is an instance of pitch class', () => {
        expect(PitchClass.isPitchClass(new PitchClass('C'))).to.be.true
      })

      it('returns false when object is not an instance of pitch class', () => {
        expect(PitchClass.isPitchClass({ note: 'C' })).to.be.false
      })
    })
  })

  it('should have these attributes', () => {
    const pc = new PitchClass('C')
    expect(pc.pitchClass).to.eql('C')
    expect(pc.classSet).to.eql('b')
    expect(pc.classIndex).to.eql(0)
  })

  it('Throws exception when called with invalid pitchClass', () => {
    expect(() => new PitchClass('omg')).to.throw(InvalidInput)
  })

  it('#toString', () => {
    expect(new PitchClass('C').toString()).to.eql('C')
  })

  describe('#classIndex', () => {
    it('should return the correct class index for each pitch class', () => {
      [
        ['c', 0],
        ['d', 2],
        ['f', 5],
        ['gb', 6],
        ['bb', 10],
        ['c#', 1],
        ['f#', 6]
      ].forEach(([pc, index]) => {
        checkClassIndex(pc, index)
      })
    })
  })

  describe('#interval', () => {
    describe('regular pitch classes', () => {
      describe('Checks the pitch class Db', function() {
        const db      = new PitchClass('db')
        const db_stub = {
          '-13': new PitchClass('c'),
          '-12': new PitchClass('db'),
          '-11': new PitchClass('d'),
          '-1':  new PitchClass('c'),
          '0':   new PitchClass('db'),
          '1':   new PitchClass('d'),
          '11':  new PitchClass('c'),
          '12':  new PitchClass('db'),
          '13':  new PitchClass('d')
        }
        testIntervals(db, db_stub)
      })

      describe('Checks the pitch class C#', () => {
        const cs      = new PitchClass('c#')
        const cs_stub = {
          '-13': new PitchClass('c'),
          '-12': new PitchClass('c#'),
          '-11': new PitchClass('d'),
          '-1':  new PitchClass('c'),
          '0':   new PitchClass('c#'),
          '1':   new PitchClass('d'),
          '11':  new PitchClass('c'),
          '12':  new PitchClass('c#'),
          '13':  new PitchClass('d')
        }
        testIntervals(cs, cs_stub)
      })

      describe('Checks the pitch class G', function() {
        const db      = new PitchClass('G')
        const db_stub = {
          '-13': new PitchClass('Gb'),
          '-12': new PitchClass('G'),
          '-11': new PitchClass('Ab'),
          '-1':  new PitchClass('Gb'),
          '0':   new PitchClass('G'),
          '1':   new PitchClass('Ab'),
          '11':  new PitchClass('Gb'),
          '12':  new PitchClass('G'),
          '13':  new PitchClass('Ab')
        }
        testIntervals(db, db_stub)
      })

      describe('Checks the pitch class B', function() {
        const db      = new PitchClass('b')
        const db_stub = {
          '-13': new PitchClass('Bb'),
          '-12': new PitchClass('B'),
          '-11': new PitchClass('C'),
          '-1':  new PitchClass('Bb'),
          '0':   new PitchClass('B'),
          '1':   new PitchClass('C'),
          '11':  new PitchClass('Bb'),
          '12':  new PitchClass('B'),
          '13':  new PitchClass('C')
        }
        testIntervals(db, db_stub)
      })
    })

    describe('multiple sharps', () => {
      describe('Checks the pitch class Cx', function() {
        const db      = new PitchClass('Cx')
        const db_stub = {
          '-13': new PitchClass('Bx'),
          '-12': new PitchClass('Cx'),
          '-11': new PitchClass('Cx#'),
          '-1':  new PitchClass('Bx'),
          '0':   new PitchClass('Cx'),
          '1':   new PitchClass('Cx#'),
          '11':  new PitchClass('Bx'),
          '12':  new PitchClass('Cx'),
          '13':  new PitchClass('Cx#')
        }
        testIntervals(db, db_stub)
      })

      describe('Checks the pitch class Ex#', function() {
        const db      = new PitchClass('Ex#')
        const db_stub = {
          '-13': new PitchClass('Dxx'),
          '-12': new PitchClass('Ex#'),
          '-11': new PitchClass('Fx#'),
          '-1':  new PitchClass('Dxx'),
          '0':   new PitchClass('Ex#'),
          '1':   new PitchClass('Fx#'),
          '11':  new PitchClass('Dxx'),
          '12':  new PitchClass('Ex#'),
          '13':  new PitchClass('Fx#')
        }
        testIntervals(db, db_stub)
      })

      describe('Checks the pitch class Bxx#', function() {
        const db      = new PitchClass('Bxx#')
        const db_stub = {
          '-13': new PitchClass('Axxx'),
          '-12': new PitchClass('Bxx#'),
          '-11': new PitchClass('Cxx#'),
          '-1':  new PitchClass('Axxx'),
          '0':   new PitchClass('Bxx#'),
          '1':   new PitchClass('Cxx#'),
          '11':  new PitchClass('Axxx'),
          '12':  new PitchClass('Bxx#'),
          '13':  new PitchClass('Cxx#')
        }
        testIntervals(db, db_stub)
      })

      describe('Checks the pitch class Fx#', function() {
        const db      = new PitchClass('Fx#')
        const db_stub = {
          '-13': new PitchClass('Ex#'),
          '-12': new PitchClass('Fx#'),
          '-11': new PitchClass('Fxx'),
          '-1':  new PitchClass('Ex#'),
          '0':   new PitchClass('Fx#'),
          '1':   new PitchClass('Fxx'),
          '11':  new PitchClass('Ex#'),
          '12':  new PitchClass('Fx#'),
          '13':  new PitchClass('Fxx')
        }
        testIntervals(db, db_stub)
      })
    })

    describe('multiple flats', () => {
      describe('Checks the pitch class Abb', function() {
        const db      = new PitchClass('Abb')
        const db_stub = {
          '-13': new PitchClass('Abbb'),
          '-12': new PitchClass('Abb'),
          '-11': new PitchClass('Bbbb'),
          '-1':  new PitchClass('Abbb'),
          '0':   new PitchClass('Abb'),
          '1':   new PitchClass('Bbbb'),
          '11':  new PitchClass('Abbb'),
          '12':  new PitchClass('Abb'),
          '13':  new PitchClass('Bbbb')
        }
        testIntervals(db, db_stub)
      })

      describe('Checks the pitch class Fb', function() {
        const db      = new PitchClass('Fb')
        const db_stub = {
          '-13': new PitchClass('Eb'),
          '-12': new PitchClass('Fb'),
          '-11': new PitchClass('Gbb'),
          '-1':  new PitchClass('Eb'),
          '0':   new PitchClass('Fb'),
          '1':   new PitchClass('Gbb'),
          '11':  new PitchClass('Eb'),
          '12':  new PitchClass('Fb'),
          '13':  new PitchClass('Gbb')
        }
        testIntervals(db, db_stub)
      })

      describe('Checks the pitch class Cbbbb', function() {
        const db      = new PitchClass('Cbbbb')
        const db_stub = {
          '-13': new PitchClass('Bbbbb'),
          '-12': new PitchClass('Cbbbb'),
          '-11': new PitchClass('Dbbbbb'),
          '-1':  new PitchClass('Bbbbb'),
          '0':   new PitchClass('Cbbbb'),
          '1':   new PitchClass('Dbbbbb'),
          '11':  new PitchClass('Bbbbb'),
          '12':  new PitchClass('Cbbbb'),
          '13':  new PitchClass('Dbbbbb')
        }
        testIntervals(db, db_stub)
      })

      describe('Checks the pitch class Gbbb', function() {
        const db      = new PitchClass('Gbbb')
        const db_stub = {
          '-13': new PitchClass('Gbbbb'),
          '-12': new PitchClass('Gbbb'),
          '-11': new PitchClass('Abbbb'),
          '-1':  new PitchClass('Gbbbb'),
          '0':   new PitchClass('Gbbb'),
          '1':   new PitchClass('Abbbb'),
          '11':  new PitchClass('Gbbbb'),
          '12':  new PitchClass('Gbbb'),
          '13':  new PitchClass('Abbbb')
        }
        testIntervals(db, db_stub)
      })

      describe('Checks the pitch class Ebbbb', function() {
        const db      = new PitchClass('Ebbbb')
        const db_stub = {
          '-13': new PitchClass('Ebbbbb'),
          '-12': new PitchClass('Ebbbb'),
          '-11': new PitchClass('Fbbbb'),
          '-1':  new PitchClass('Ebbbbb'),
          '0':   new PitchClass('Ebbbb'),
          '1':   new PitchClass('Fbbbb'),
          '11':  new PitchClass('Ebbbbb'),
          '12':  new PitchClass('Ebbbb'),
          '13':  new PitchClass('Fbbbb')
        }
        testIntervals(db, db_stub)
      })
    })
  })
})

function checkClassIndex(pitchClass, indexExpected) {
  expect(new PitchClass(pitchClass).classIndex).to.equal(indexExpected)
}
