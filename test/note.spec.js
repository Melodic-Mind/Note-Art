import {
    expect
} from 'chai'
import {
    Note,
    Piano
} from './../src'

const piano = new Piano()
const c = new Note({
    note: 'c'
})

describe('Note', () => {
    it('checks properties', () => {
        expect(c.note).to.eql('C')
        expect(c.octave).to.eql(3)
        expect(c.family).to.eql('b')
        expect(c.duration).to.eql('q')
        expect(c.family).to.eql('b')
        expect(c.index).to.eql(0)
    })
    describe('Methods:', () => {
        describe('interval', () => {
            it('Checks the note C', function () {
                const c_stub = {
                    '-13': piano.note('b1q'),
                    '-12': piano.note('c2q'),
                    '-11': piano.note('db2q'),
                    '-1': piano.note('b2q'),
                    '0': piano.note('c3q'),
                    '1': piano.note('db3q'),
                    '11': piano.note('b3q'),
                    '12': piano.note('c4q'),
                    '13': piano.note('db4q'),
                }
                expect(c.interval(-13)).to.eql(c_stub['-13'])
                expect(c.interval(-12)).to.eql(c_stub['-12'])
                expect(c.interval(-11)).to.eql(c_stub['-11'])
                expect(c.interval(-1)).to.eql(c_stub['-1'])
                expect(c.interval(0)).to.eql(c_stub['0'])
                expect(c.interval(1)).to.eql(c_stub['1'])
                expect(c.interval(11)).to.eql(c_stub['11'])
                expect(c.interval(12)).to.eql(c_stub['12'])
                expect(c.interval(13)).to.eql(c_stub['13'])
            })
            it('Checks the note Db', function () {
                const db = new Note({
                    note: 'db',
                    octave: 5
                })
                const db_stub = {
                    '-13': piano.note('c4q'),
                    '-12': piano.note('db4q'),
                    '-11': piano.note('d4q'),
                    '-1': piano.note('c5q'),
                    '0': piano.note('db5q'),
                    '1': piano.note('d5q'),
                    '11': piano.note('c6q'),
                    '12': piano.note('db6q'),
                    '13': piano.note('d6q'),
                }
                expect(db.interval(-13)).to.eql(db_stub['-13'])
                expect(db.interval(-12)).to.eql(db_stub['-12'])
                expect(db.interval(-11)).to.eql(db_stub['-11'])
                expect(db.interval(-1)).to.eql(db_stub['-1'])
                expect(db.interval(0)).to.eql(db_stub['0'])
                expect(db.interval(1)).to.eql(db_stub['1'])
                expect(db.interval(11)).to.eql(db_stub['11'])
                expect(db.interval(12)).to.eql(db_stub['12'])
                expect(db.interval(13)).to.eql(db_stub['13'])
            })

            it('Checks the note cs', function () {
                const cs = new Note({
                    note: 'c#'
                })
                const cs_stub = {
                    '-13': piano.note('c2q'),
                    '-12': piano.note('c#2q'),
                    '-11': piano.note('d2q'),
                    '-1': piano.note('c3q'),
                    '0': piano.note('c#3q'),
                    '1': piano.note('d3q'),
                    '11': piano.note('c4q'),
                    '12': piano.note('c#4q'),
                    '13': piano.note('d4q'),
                }
                expect(cs.interval(-13)).to.eql(cs_stub['-13'])
                expect(cs.interval(-12)).to.eql(cs_stub['-12'])
                expect(cs.interval(-11)).to.eql(cs_stub['-11'])
                expect(cs.interval(-1)).to.eql(cs_stub['-1'])
                expect(cs.interval(0)).to.eql(cs_stub['0'])
                expect(cs.interval(1)).to.eql(cs_stub['1'])
                expect(cs.interval(11)).to.eql(cs_stub['11'])
                expect(cs.interval(12)).to.eql(cs_stub['12'])
                expect(cs.interval(13)).to.eql(cs_stub['13'])
            })

            it('Checks the note g', function () {
                const g = new Note({
                    note: 'g'
                })
                const g_stub = {
                    '-13': piano.note('f#2q'),
                    '-12': piano.note('g2q'),
                    '-11': piano.note('g#2q'),
                    '-1': piano.note('f#3q'),
                    '0': piano.note('g3q'),
                    '1': piano.note('g#3q'),
                    '11': piano.note('f#4q'),
                    '12': piano.note('g4q'),
                    '13': piano.note('g#4q'),
                }
                expect(g.interval(-13)).to.eql(g_stub['-13'])
                expect(g.interval(-12)).to.eql(g_stub['-12'])
                expect(g.interval(-11)).to.eql(g_stub['-11'])
                expect(g.interval(-1)).to.eql(g_stub['-1'])
                expect(g.interval(0)).to.eql(g_stub['0'])
                expect(g.interval(1)).to.eql(g_stub['1'])
                expect(g.interval(11)).to.eql(g_stub['11'])
                expect(g.interval(12)).to.eql(g_stub['12'])
                expect(g.interval(13)).to.eql(g_stub['13'])
            })

            it('Checks the note b', function () {
                const b = new Note({
                    note: 'b'
                })
                const b_stub = {
                    '-13': piano.note('a#2q'),
                    '-12': piano.note('b2q'),
                    '-11': piano.note('c3q'),
                    '-1': piano.note('a#3q'),
                    '0': piano.note('b3q'),
                    '1': piano.note('c4q'),
                    '11': piano.note('a#4q'),
                    '12': piano.note('b4q'),
                    '13': piano.note('c5q'),
                }
                expect(b.interval(-13)).to.eql(b_stub['-13'])
                expect(b.interval(-12)).to.eql(b_stub['-12'])
                expect(b.interval(-11)).to.eql(b_stub['-11'])
                expect(b.interval(-1)).to.eql(b_stub['-1'])
                expect(b.interval(0)).to.eql(b_stub['0'])
                expect(b.interval(1)).to.eql(b_stub['1'])
                expect(b.interval(11)).to.eql(b_stub['11'])
                expect(b.interval(12)).to.eql(b_stub['12'])
                expect(b.interval(13)).to.eql(b_stub['13'])
            })
            it('Random interval tests', () => {
                expect(piano.note('b4e').interval(1).interval(-1)).to.eql(piano.note('b4e'))
                expect(piano.note('b4e').interval(1)).to.eql(piano.note('C5e'))
                expect(new Note({
                    note: 'c',
                    octave: 5,
                    duration: 'e'
                }).interval(-1)).to.eql(new Note({
                    note: 'b',
                    octave: 4,
                    duration: 'e'
                }))
                expect(piano.note('e5e').interval(12)).to.eql(piano.note('e6e'))
                expect(piano.note('d#5e').interval(12)).to.eql(piano.note('d#6e'))
            })
        })
        it('toString ', () => {
            const stub = 'C3'
            expect(c.toString()).to.eql(stub)
        })
        it('equals ', () => {
            const stub = new Note({
                note: 'c'
            })
            expect(c.isEqual(stub)).to.true
        })
        it('transpose ', () => {
            expect(c.transpose(5)).to.eql(c.interval(5))
        })
        it('clone ', () => {
            expect(c.clone()).to.eql(c)
        })
        it('calculate frequency ', () => {
            expect(piano.note('a4q').calculateFrequency()).to.eql(440)
        })
        it('change duration ', () => {
            expect(c.changeDuration('e').duration).to.eql('e')
        })
        it('print ', () => {
            const stub = "{Note: C, Octave: 3}"
            expect(c.print()).to.eql(stub)
        })
    })
})