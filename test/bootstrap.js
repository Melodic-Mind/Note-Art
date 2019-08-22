import 'amd-loader'
import {Instrument} from '../src'
import sinon        from 'sinon'
import sinonChai    from 'sinon-chai'
import chai         from 'chai'

chai.use(sinonChai)

sinon.stub(Instrument, 'getTonePlayers').returns(new Map())
sinon.stub(Instrument, 'toMaster').returns()

Map.prototype.add = Map.prototype.set

global.expect = chai.expect
global.sinon  = sinon
global.dd     = require('dumper.js').dd
global.dump   = require('dumper.js').dump
