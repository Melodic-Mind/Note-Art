/**
 * Pagination logic handling.
 */
export class Paginator {
    /**
     * Creates a new Paginator instance.
     * @param {Number}  [offset=50]
     * @param {Array}  [data=[]]
     */
    constructor(offset = 50, data = []) {
        this.atts = {
            offset,
            data,
            page: 1,
        }
    }

    /**
     * Returns the paginator offset.
     * @returns {Number}
     */
    get offset() {
        return this.atts.offset
    }

    /**
     * Sets the paginator offset.
     * @param {Number} offset
     */
    set offset(offset) {
        this.atts.offset = offset
        this.page        = 1
    }

    /**
     * if called with parameter sets the paginator data,
     * Retrieves the data from the current paginator page.
     * @param {Array} [data = null]
     * @returns {Array}
     */
    data(data = null) {
        if (data) {
            this.atts.data = data
            this.page      = 1
        }

        return this.atts.data.slice(this.pageStart, this.pageEnd)
    }

    /**
     * Get the current paginator page.
     * @returns {Number}
     */
    get page() {
        return this.atts.page
    }

    /**
     * Sets the current paginator page.
     */
    set page(page) {
        this.atts.page = this.inPageRange(page) ? page : 1
    }

    /**
     * Returns the overall number of pages.
     * @returns {Number}
     */
    get pages() {
        return Math.ceil(this.atts.data.length / this.offset)
    }

    /**
     * Returns the page start index.
     * @returns {Number}
     * @protected
     */
    get pageStart() {
        return this.offset * (this.page - 1)
    }

    /**
     * Returns the page end index.
     * @returns {Number}
     * @protected
     */
    get pageEnd() {
        const end    = this.offset * this.page
        const maxLen = this.atts.data.length
        return end < maxLen ? end : maxLen
    }

    /**
     * Checks whether a page is valid.
     * @param {Number} page
     * @returns {boolean}
     */
    inPageRange(page) {
        return page < 1 || page > this.pages ? false : true
    }

    /**
     * Checks if there's a next page.
     * @returns {boolean}
     */
    hasNext() {
        return this.pageEnd + 1 < this.atts.data.length
    }

    /**
     * Checks if there's a previous page.
     * @returns {boolean}
     */
    hasPrevious() {
        return this.pageStart !== 0
    }

    /**
     * Advances to the next page.
     */
    next() {
        this.page++
    }

    /**
     * Goes to the previous page.
     */
    previous() {
        this.page--
    }
}
