import { Piano, Measure, } from "../../src"

const piano = new Piano()
let meas;
beforeEach(() => {
    meas = new Measure(16)
    return meas
})
describe("Measure", () => {
    it('Checks properties', () => {
        expect(meas.noteSets.length).to.eql(0)
        expect(meas.maxDuration).to.eql(16)
    })

    it('#push', () => {
        meas.pushSet()
        expect(meas.duration).to.eql(0)
        meas.pushSet([piano.note('e44n')])
        expect(meas.noteSets.length).to.eql(1)
    })

    it('Checks a measure cant contain a number of notes that exceeds its max duration', () => {
        const noteSets = [
                [piano.note("c44n")],
                [piano.note("g44n")],
                [piano.note("f44n")],
                [piano.note("g44n")],
                [piano.note("f44n")]
            ],
            stub = [
                [piano.note("c44n")],
                [piano.note("g44n")],
                [piano.note("f44n")],
                [piano.note("g44n")]
            ]
        meas.pushSets(noteSets)
        expect(meas.noteSets).to.eql(stub)
    })

    it('#isFull', () => {
        const sets = [
            [piano.note("c44n")],
            [piano.note("g44n")],
            [piano.note("f44n")],
            [piano.note("g44n")]
        ]
        meas.pushSets(sets)
        expect(meas.isFull()).to.be.true
    })

    it('#mutate', () => {
        const sets = [
            [piano.note("c44n")],
            [piano.note("g44n")],
            [piano.note("f44n")],
            [piano.note("g44n")]
        ]
        meas.pushSets(sets)
        const someSet = [piano.note('d44n')]
        meas.insertSet(someSet, 1, 1)
        // console.log(meas.noteSets[0], meas.noteSets[4])
        expect(meas.noteSets[1]).to.be.eql(someSet)
    })

    it('#delete', () => {
        const sets = [
            [piano.note("c44n")],
            [piano.note("g44n")],
            [piano.note("f44n")],
            [piano.note("g44n")]
        ]
        meas.pushSets(sets)
        meas.deleteNoteSet(0)
        const stub = [
            [piano.note("g44n")],
            [piano.note("f44n")],
            [piano.note("g44n")]
        ]
        expect(meas.noteSets).to.eql(stub)
        expect(meas.duration).to.eql(12)
    })

    it('#transpose', () => {
        const ms_test = new Measure(),
            stub = [
                [piano.note('f58n')],
                [piano.note('e58n')],
                [piano.note('gb58n')],
                [piano.note('c58n')],
                [piano.note('d#58n')],
                [piano.note('db58n')],
            ]
        ms_test.pushSets([
            [piano.note('e58n')],
            [piano.note('d#58n')],
            [piano.note('f58n')],
            [piano.note('b48n')],
            [piano.note('d58n')],
            [piano.note('c58n')],
        ])
        expect(ms_test.transpose(1).noteSets).to.eql(stub)
        expect(ms_test.transpose(1).transpose(-1).noteSets).to.eql(ms_test.noteSets)
    })

    it('#toString', () => {
        meas.pushSet([piano.note('c44n')])
        const stub = 'Measure: {Notes: [ C4, ], } '
        expect(meas.toString()).to.eql(stub)
    })
})
