/* global describe it */

const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require('../advanced-lowbar');

describe ('_', () => {
  it ('exists', () => {
    expect(_).to.be.an('object');
  });

  describe ('.identity', () => {
    it ('returns the value used as the argument', () => {
      expect(_.identity(5)).to.equal(5);
    });
    it ('returns the exact same object, not a copy', () => {
      const obj = {};
      expect(_.identity(obj)).to.equal(obj);
    });
  });

  describe ('.first', () => {
    it ('returns the first element in an array', () => {
      expect(_.first([1,2,3,4,5])).to.equal(1);
      expect(_.first([[1, 2, 3], 4, 5, 6])).to.eql([1, 2, 3]);
      expect(_.first([{}, 4, 5])).to.eql({});
    });
    it ('returns the first n elements of an array', () => {
      expect(_.first([1,2,3,4,5], 2)).to.eql([1, 2]);
      expect(_.first([1, {}, [3, 4, 5], 4, 5], 3)).to.eql([1, {}, [3, 4, 5]]);
    });
    it ('returns whole array if n is bigger than the array length', () => {
      expect(_.first([1, 2, 3], 100)).to.eql([1, 2, 3]);
    });
    it ('works for strings', () => {
      expect(_.first('string')).to.equal('s');
      expect(_.first('string', 3)).to.eql(['s', 't', 'r']);
    });
    it ('returns an empty array if n is less than 1', () => {
      expect(_.first([1,2,3,4,5], -3)).to.eql([]);
    });
  });

  describe ('.last', () => {
    it ('returns the first element in an array', () => {
      expect(_.last([3, 2, 1])).to.equal(1);
      expect(_.last([[1, 2, 3]])).to.eql([1, 2, 3]);
      expect(_.last([1, 2, 3, 4, 5, {}])).to.eql({});
    });
    it ('returns the last n elements of an array', () => {
      expect(_.last([1,2,3,4,5], 2)).to.eql([4, 5]);
      expect(_.last([1, {}, [3, 4, 5], 4, 5], 3)).to.eql([[3, 4, 5], 4, 5]);
    });
    it ('returns whole array if n is bigger than the array length', () => {
      expect(_.last([1, 2, 3], 100)).to.eql([1, 2, 3]);
    });
    it ('works for strings', () => {
      expect(_.last('string')).to.equal('g');
      expect(_.last('string', 3)).to.eql(['i', 'n', 'g']);
    });
    it ('returns an empty array if n is less than 1', () => {
      expect(_.last([1,2,3,4,5], -3)).to.eql([]);
    });
  });

  describe ('.each', () => {
    it ('returns the list for chaining', () => {
      expect(_.each([1, 2, 3])).to.eql([1, 2, 3]);
      expect(_.each({})).to.eql({});
      expect(_.each('string')).to.eql('string');
    });
    it ('performs iteratee function for each element in an array', () => {
      const spy = sinon.spy(function () {});
      _.each([1, 2, 3], spy);
      expect(spy.callCount).to.equal(3);
      expect(spy.args).to.eql([
        [1, 0, [1, 2, 3]], 
        [2, 1, [1, 2, 3]], 
        [3, 2, [1, 2, 3]]
      ]);
    });
    it ('performs iteratee function for each char in a string', () => {
      const spy = sinon.spy(function () {});
      _.each('abc', spy);
      expect(spy.callCount).to.equal(3);
      expect(spy.args).to.eql([
        ['a', 0, 'abc'], 
        ['b', 1, 'abc'], 
        ['c', 2, 'abc']
      ]);
    });
    it ('performs iteratee function for each key-value pair in an object', () => {
      const spy = sinon.spy(function () {});
      _.each({0: 1, 1: 2, 2: 3}, spy);
      expect(spy.callCount).to.equal(3);
      expect(spy.args).to.eql([
        [1, '0', {0: 1, 1: 2, 2: 3}], 
        [2, '1', {0: 1, 1: 2, 2: 3}], 
        [3, '2', {0: 1, 1: 2, 2: 3}]
      ]);
    });
    it ('binds the iteratee function to the context', () => {
      const fruits = {
        names: ['apple', 'banana', 'orange'],
        sayName: function (name) {
          return name;
        }
      }
      const res = [];
      _.each(fruits.names, function (element) {
        res.push(this.sayName(element));
      }, fruits);

      expect(res).to.eql(['apple', 'banana', 'orange']);

      const context = {hello: 'context'};
      const spy = sinon.spy(function () {});
      _.each([1], spy, context);
      expect(spy.thisValues).to.eql([{hello: 'context'}]); 
    });
  });

  describe ('.indexOf', () => {
    it ('return the first index where the value can be found', () => {
      expect(_.indexOf([1, 2, 3], 2)).to.equal(1);
      expect(_.indexOf([1, 2, 3], 1)).to.equal(0);
      expect(_.indexOf([1, 2, 'a'], 'a')).to.equal(2);
    });
    it ('works for strings', () => {
      expect(_.indexOf('abcdefg', 'b')).to.equal(1);
    });
    it ('returns -1 if value cannot be found', () => {
      expect(_.indexOf([1, 2, 3], 4)).to.equal(-1);
      expect(_.indexOf('123', '4')).to.equal(-1);
    });
    it ('uses a binary search if isSorted is true', () => {
      expect(_.indexOf([1, 2, 3, 4, 5, 6, 7, 8], 7, true)).to.equal(6);
    });
  });

  describe ('.filter', () => {
    it ('returns the whole array if no predicate is passed', () => {
      expect(_.filter([1, 2, 3])).to.eql([1, 2, 3]);
    });
    it ('returns an empty array if no element passes', () => {
      expect(_.filter([1,2,3], n => n === 0)).to.eql([]);
      expect(_.filter({}, n => n === 0)).to.eql([]);
    });
    it ('returns only the values that pass the predicate test', () => {
      expect(_.filter([1,2,3,4,5], n => n%2 === 0)).to.eql([2,4]);
    });
    it ('binds the predicate to context', () => {
      const context = {hello: 'context'};
      const spy = sinon.spy(function () {});
      _.filter([1], spy, context);
      expect(spy.thisValues).to.eql([{hello: 'context'}]); 
    });
  });

  describe ('.reject', () => {
    it ('returns empty array if no predicate is passed or not an array', () => {
      expect(_.reject([1, 2, 3])).to.eql([]);
      expect(_.reject({}, n => n === 0)).to.eql([]);
    });
    it ('returns the whole array if no element passes', () => {
      expect(_.reject([1,2,3], n => n === 0)).to.eql([1,2,3]);
    });
    it ('returns only the values that do not pass the predicate test', () => {
      expect(_.reject([1,2,3,4,5], n => n%2 === 0)).to.eql([1,3,5]);
    });
    it ('binds the predicate to context', () => {
      const context = {hello: 'context'};
      const spy = sinon.spy(function () {});
      _.reject([1], spy, context);
      expect(spy.thisValues).to.eql([{hello: 'context'}]); 
    });
  });

  describe ('.uniq', () => {
    it ('returns the array wthout duplicates', () => {
      expect(_.uniq([1, 1, 3, 2, 3, 4, 4, 3, 3])).to.eql([1, 3, 2, 4]);
      expect(_.uniq([4, 3, 4, 4, 1])).to.eql([4, 3, 1]);
    });

    it ('works for strings', () => {
      expect(_.uniq('abcb')).to.eql(['a', 'b', 'c']);
    });

    it ('uses the iteratee to compare properties of objects', () => {
      let people = [{ name: 'John', age: 20 }, { name: 'Mary', age: 31 }, { name: 'Kevin', age: 20 }];
      let expected = [ { age: 20, name: "John" }, { age: 31, name: "Mary" } ];
      expect(_.uniq(people, false, function (p) { return p.age; })).to.eql(expected);
    });
  });

  describe ('.map', () => {
    const context = {a: 'context'};
    const spy = sinon.spy(function () {});
    _.map([1, 2], spy, context);
    it ('calls iteratee correct number of times', () => {
      expect(spy.callCount).to.equal(2);
    });
    it ('calls the iteratee with the correct args', () => {
      expect(spy.args).to.eql([
        [1, 0, [1, 2]], 
        [2, 1, [1, 2]]
      ]);
    });
    it ('calls iteratee with the correct context', () => {
      expect(spy.thisValues[0]).to.eql({a: 'context'});
    });
    it ('returns a new array', () => {
      function doubleNUm (n) { return n * 2; };
      expect(_.map([1,2,3], doubleNUm)).to.eql([2,4,6]);
    });
    it ('maps over objects', () => {
      function doubleNUm (n) { return n * 2; };
      expect(_.map({0:1,1:2,2:3}, doubleNUm)).to.eql([2,4,6]);
    });
  });

  describe ('.pluck', () => {
    it ('uses map to grab an array of object properties', () => {
      const obj = [{'foo':100, 'bar':200}, {'foo':1, 'bar':2}, {'foo':50, 'bar':20}];
      expect(_.pluck(obj, 'bar')).to.eql([200, 2, 20]);
    });
  });

  describe ('.reduce', () => {
    const context = {a: 'context'};
    const spy = sinon.spy(function (acc, n) {return acc+n});
    _.reduce([1, 2], spy, 0, context);
    it ('calls iteratee correct number of times', () => {
      expect(spy.callCount).to.equal(2);
    });
    it ('calls the iteratee with the correct args', () => {
      expect(spy.args).to.eql([
        [0, 1, 0, [1, 2]], 
        [1, 2, 1, [1, 2]]
      ]);
    });
    it ('calls iteratee with the correct context', () => {
      expect(spy.thisValues[0]).to.eql({a: 'context'});
    });

    it ('can reduce to an array', () => {
      expect(_.reduce([1,2,3,4,5], function (acc, num) {
        if (num % 2 === 0) {
          acc.push(num*2);
        }
        return acc;
      }, [])).to.eql([4,8]);
    });
  });

  describe ('.contains', () => {
    it ('returns false if list does not contain value', () => {
      expect(_.contains([1,2,3,4], 10)).to.be.false;
      expect(_.contains({'a':1, 'b':2}, 10)).to.be.false;
    });
    it ('returns true if list does contain value', () => {
      expect(_.contains([1,2,3,4], 3)).to.be.true;
      expect(_.contains({'a':1, 'b':2}, 1)).to.be.true;
    });
    it ('if list is an array use fromIndex to only search values after that index', () => {
      expect(_.contains([1,2,3,4,5,6,7,8,9], 2, 5)).to.be.false;
      expect(_.contains([1,2,3,4,5,6,7,8,9], 9, 5)).to.be.true;
    });
  });

  describe ('.every', () => {
    it ('returns false if one or more elements don\'t pass the predicate', () => {
      function isEven (n) {return n%2 === 0};
      function isA (c) {return c==='a'};
      expect(_.every([1, 2, 3], isEven)).to.be.false;
      expect(_.every('aaaba', isA)).to.be.false;
      expect(_.every({'a':2, 'b':3}, isEven)).to.be.false;
    });
    it ('returns true if all elements pass the predicate', () => {
      function isEven (n) {return n%2 === 0};
      function isA (c) {return c==='a'};
      expect(_.every([6, 2, 4], isEven)).to.be.true;
      expect(_.every('aaaa', isA)).to.be.true;
      expect(_.every({'a':2, 'b':8}, isEven)).to.be.true;
    });
    it ('binds the predicate to the context', () => {
      const spy = sinon.spy(function () {});
      const context = {'a': 'context'}
      _.every([1, 2, 3], spy, context);
      expect(spy.thisValues[0]).to.eql({'a': 'context'});
    });
  });

  describe ('.some', () => {
    it ('returns false if all elements don\'t pass the predicate', () => {
      function isEven (n) {return n%2 === 0};
      function isA (c) {return c==='a'};
      expect(_.some([1, 5, 3], isEven)).to.be.false;
      expect(_.some('bcd', isA)).to.be.false;
      expect(_.some({'a':5, 'b':3}, isEven)).to.be.false;
    });
    it ('returns true if any elements pass the predicate', () => {
      function isEven (n) {return n%2 === 0};
      function isA (c) {return c==='a'};
      expect(_.some([6, 1, 3], isEven)).to.be.true;
      expect(_.some('bnkudgwadwu', isA)).to.be.true;
      expect(_.some({'a':2, 'b':5}, isEven)).to.be.true;
    });
    it ('binds the predicate to the context', () => {
      const spy = sinon.spy(function () {});
      const context = {'a': 'context'}
      _.some([1, 2, 3], spy, context);
      expect(spy.thisValues[0]).to.eql({'a': 'context'});
    });
  });

  describe ('.extend', () => {
    it ('returns destination if it is not an object', () => {
      expect(_.extend(5, {'a':1})).to.eql(5);
      expect(_.extend([], {'a':1})).to.eql([]);
    });
    it ('returns the original object if no sources given', () => {
      expect(_.extend({})).to.eql({});
      expect(_.extend({'a':1})).to.eql({'a':1});
    });
    it ('copies properties over', () => {
      expect(_.extend({'a':1}, {'b':2}, {'c':3})).to.eql({'a':1,'b':2,'c':3});
    });
    it ('overwrites previous entries for the same key', () => {
      expect(_.extend({'a':1}, {'a':2}, {'a':100})).to.eql({'a':100});
    });
  });

  describe ('.defaults', () => {
    it ('returns destination if it is not an object', () => {
      expect(_.defaults(5, {'a':1})).to.eql(5);
      expect(_.defaults([], {'a':1})).to.eql([]);
    });
    it ('returns the original object if no sources given', () => {
      expect(_.defaults({})).to.eql({});
      expect(_.defaults({'a':1})).to.eql({'a':1});
    });
    it ('only copies properties over if the destination does not already have that key', () => {
      expect(_.defaults({'a':1}, {'b':2}, {'c':3}, {'a':100})).to.eql({'a':1,'b':2,'c':3});
    });
  });

  describe ('.once', () => {
    const spy = sinon.spy(function (a, b) {});
		it ('can only be called once', () => {
      const func = _.once(spy);
			func();
			func();
			func();
			expect(spy.callCount).to.equal(1);
    });
		it ('gets called with the correct arguments', () => {
			const func = _.once(spy);
			func(100, 200);
			expect(spy.calledWith(100, 200)).to.be.true;
		});
  });

	describe ('.memoize', () => {
		var fibonacci = _.memoize(function(n) {
			return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
		});
		it ('speeds up the runtime of a recursive function', () => {
			expect(fibonacci(20)).to.equal(6765);
		});
		it ('the returned function has a cache property', () => {
			expect(fibonacci.cache).to.be.an('object');
		});
	});

	describe ('.delay', () => {
		it ('calls the function only after a set time', () => {
			const spy = sinon.spy(function () {});
			const clock = sinon.useFakeTimers();
			_.delay(spy, 100);
			clock.tick(99);
			expect(spy.callCount).to.equal(0);
			clock.tick(2);
			expect(spy.callCount).to.equal(1);
		});
	});
});