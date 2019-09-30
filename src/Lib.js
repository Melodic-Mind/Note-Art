import Tone from 'tone'

/**
 * A wrapper the library uses for setting and getting global state variables.
 */
class Lib {
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

const lib = new Lib()

lib.set('tone', () => {
  return Tone
})

lib.set('path', () => {
  return 'https://note-art-server.herokuapp.com/audio/'
})

lib.set('ready', () => {
  return false
})

lib.set('Cord', () => {
  return 'guitar'
})

lib.set('Piano', () => {
  return 'piano'
})

lib.set('Drumset', () => {
  return 'drums'
})

export {lib}
