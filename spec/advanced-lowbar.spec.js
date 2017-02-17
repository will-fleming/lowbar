/* global describe, it */

var _ = require('../advanced-lowbar');
var expect = require('chai').expect;

describe('_', function () {

    describe('#indexOf', function () {
        it('exists', function () {
            expect(_.indexOf).to.be.a('function');
        });
    });

});