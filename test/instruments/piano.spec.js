import {Piano} from '../../src'
import {Note}    from '../../src'


describe('Piano', () => {
  let piano
  beforeEach(() => {
    piano = new Piano()
  })

  it('has the path set to piano', () => {
    expect(Piano.instrumentPath).to.equal('piano')
  })

  it('#toString', () => {
    expect(piano.toString()).to.equal('piano')
  })

  it('generates correct path for piano', () =>{
    expect(piano.generatePath(Note.builder('C3'))).to.equal('https://note-art-server.herokuapp.com/audio/piano/C3.mp3')
  })
})
