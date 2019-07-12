/**
 * A wrapper the library uses for setting and getting global state variables.
 */
export class Library {
    constructor() {
        this.instances = {}
    }

    get(instance) {
        if (!this.instances[instance].called) {
            this.instances[instance].called = true
            this.instances[instance].value  = this.instances[instance].value()
        }
        return this.instances[instance].value
    }

    set(instance, callback) {
        this.instances[instance] = {called: false, value: callback}
    }
}
