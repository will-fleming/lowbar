/* global describe, it */

var _ = require('../advanced-lowbar');
var expect = require('chai').expect;
var sinon = require('sinon');

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
        it('should work for strings', function () {
            expect(_.indexOf('hello', 'e')).to.equal(1);
            expect(_.indexOf(['a', 'b'], 'b')).to.equal(1);
        });
        it('should work for bools', function () {
            expect(_.indexOf([true, false], false)).to.equal(1);
        });
        it('should use the binary search if iSorted is true', function () {
            expect(_.indexOf([1,2,3,4,5,6,7,8,9], 7, true)).to.equal(6);
            expect(_.indexOf([1,2,3,4,5,6,7,8,9], 7, false)).to.equal(6);
        });
    });

    describe('#once', function () {
        it('exists', function () {
            expect(_.once).to.be.a('function');
        });
        it('only allows a function to be called once', function () {
            var spy = sinon.spy(function () {});
            var tstFunc = _.once(spy);
            expect(spy.callCount).to.equal(0);
            tstFunc();
            expect(spy.callCount).to.equal(1);
            tstFunc();
            expect(spy.callCount).to.equal(1);
            tstFunc();
            expect(spy.callCount).to.equal(1);
        });
    });

});