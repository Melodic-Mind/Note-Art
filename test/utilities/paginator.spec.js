import { Paginator } from '../../src/utilities/Paginator'

Array.range = function (start, stop, step = 1) {
    if (stop === undefined) {
        stop  = start
        start = 0
    }

    const result = []
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i)
    }

    return result
}

const data = Array.range(227)
let pagination

describe('[UNIT] Pagination utility', () => {
    beforeEach(() => {
        pagination = new Paginator(50, data)
    })

    it('initialization', () => {
        expect(pagination.offset).to.be.eql(50)
        expect(pagination.page).to.be.eql(1)
    })

    it('constructor defaults', () => {
        const p = new Paginator()
        expect(p.offset).to.be.eql(50)
        expect(p.data()).to.be.eql([])
    })

    describe('#data', () => {
        it('Data get', () => {
            expect(pagination.data()).to.be.eql(Array.range(0, 50))
            pagination.page = 2
            expect(pagination.data()).to.be.eql(Array.range(50, 100))
            pagination.page = 5
            expect(pagination.data()).to.be.eql(Array.range(200, 227))
        })
        it('Data set', () => {
            pagination.data(data.slice(0, 20))
            expect(pagination.data()).to.be.eql(Array.range(20))
        })
    })

    it('#pages', () => {
        expect(pagination.pages).to.be.eql(5)
        pagination.data(Array.range(20))
        expect(pagination.pages).to.be.eql(1)
    })

    describe('#hasNext', () => {
        it('true when there is a next page', () => {
            expect(pagination.hasNext()).to.be.true
        })

        it('false when there is no next page', () => {
            pagination.page = 5
            expect(pagination.hasNext()).to.be.false
        })
    })

    describe('#hasPrevious', () => {
        it('false when there is no previous', () => {
            expect(pagination.hasPrevious()).to.be.false
        })

        it('true when there is a previous page', () => {
            pagination.page = 2
            expect(pagination.hasPrevious()).to.be.true
        })
    })

    it('Changing the offset', () => {
        pagination.offset = 10
        expect(pagination.offset).to.be.eql(10)
        expect(pagination.page).to.be.eql(1)
        expect(pagination.pages).to.be.eql(23)
    })

    describe('#next', () => {
        it('next advances the page when there is a next page', () => {
            pagination.next()
            expect(pagination.page).to.be.eql(2)
        })

        it('next wraps to page 1 when there is no next page', () => {
            pagination.page = 5
            pagination.next()
            expect(pagination.page).to.be.eql(1)
        })
    })

    describe('#previous', () => {
        it('previous goes to the previous page when there is a previous page', () => {
            pagination.page = 2
            pagination.previous()
            expect(pagination.page).to.be.eql(1)
        })

        it('previous doesnt go below the min page', () => {
            pagination.page = 1
            pagination.previous()
            expect(pagination.page).to.be.eql(1)
        })
    })
})
