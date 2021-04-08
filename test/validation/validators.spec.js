import { validateDuration, validateRawNote } from '../../src'
import { InvalidInput } from '../../src/Exceptions'

describe('#Validators', () => {
  describe('#validateRawNote', () => {
    it('should return true when a note is valid', () => {
      expect(validateRawNote('c3')).to.be.true
      expect(validateRawNote('c#3')).to.be.true
      expect(validateRawNote('db3')).to.be.true
      expect(validateRawNote('r')).to.be.true
      expect(validateRawNote('R')).to.be.true
    })

    it('should throw an error when a note is not valid', () => {
      expect(() => {validateRawNote('c')}).to.throw(InvalidInput)
      expect(() => {validateRawNote('123')}).to.throw(InvalidInput)
    })
  })

  describe('#validateDuration', () => {
    it('should return true when duration is valid', () => {
      expect(validateDuration('4n')).to.be.true
    })

    it('throws error when duration is invalid', () => {
      expect(() => validateDuration('NOT DURATION')).to.throw(InvalidInput)
    })
  })
})
