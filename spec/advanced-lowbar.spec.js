/* global describe, it */

var _ = require('../advanced-lowbar');
var expect = require('chai').expect;

describe('_', function () {

    describe('#indexOf', function () {
        it('exists', function () {
            expect(_.indexOf).to.be.a('function');
        });
        it('returns -1 if value is not in array', function () {
            expect(_.indexOf([1,2,3], 4)).to.equal(-1);
        });
    });

});