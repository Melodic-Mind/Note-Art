import 'amd-loader'
import sinon     from 'sinon'
import sinonChai from 'sinon-chai'
import chai      from 'chai'

chai.use( sinonChai )

global.expect = chai.expect
global.sinon  = sinon
global.dd     = require( 'dumper.js' ).dd
global.dump   = require( 'dumper.js' ).dump
