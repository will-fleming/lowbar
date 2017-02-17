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
            expect(_.indexOf([], 0), 0).to.equal(-1);
        });
        it('returns the index of value', function () {
            expect(_.indexOf([1,2,3], 2)).to.equal(1);
            expect(_.indexOf([5,3,78,4,3,6,1,4], 78)).to.equal(2);
            expect(_.indexOf([1,2,3,8,6,5], 5)).to.equal(5);
            expect(_.indexOf([1], 1)).to.equal(0);
        });
    });

});