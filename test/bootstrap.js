import 'amd-loader'
import sinon     from 'sinon'
import chai      from 'chai'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

global.expect = chai.expect
global.sinon  = sinon
global.dd     = require('dumper.js').dd
global.dump   = require('dumper.js').dump
