import { expect } from 'chai'
import { firstToUpper, twoDigitFormat, findQuery } from '../../src'
import { MissingInformation } from '../../src/Exceptions'

describe('Addons', () => {
    it('#firstToUpper', () => {
        const stub = 'Major'
        expect(firstToUpper('major')).to.eql(stub)
    })

    it('#twoDigitFormat', () => {
        expect(twoDigitFormat(1.213)).to.eql(1.21)
    })

    describe('name or pattern, query from string and pattern', () => {
        const source = require('../../src/resources/Chords.json')
        const stub = {
            "Chord": "Seven Sharp Five Sharp Nine",
            "Name": "7#5#9",
            "Pattern(intervals)": "[1, 3, #5, b7, #9]",
            "Pattern": "[4, 8, 10, 15]"
        }

        it('finds query by name', () => {
            expect(findQuery('7#5#9', null, source)).to.eql(stub)
        })

        it('finds query by pattern', () => {
            expect(findQuery(null, [4, 8, 10, 15], source)).to.eql(stub)
        })

        it('Throws MissingInformation exception', () => {
            const noNameOrPat = () => findQuery(null, null, source)
            const noSource = () => findQuery(null, [1, 2], null)
            expect(noNameOrPat).to.throw(MissingInformation)
            expect(noSource).to.throw(MissingInformation)
        })
    })
})
