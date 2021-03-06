function binarySearch (list, value) {
  let s = 0;
  let e = list.length - 1;

  for (let loop = 0; loop < list.length; loop++) {
    let m = Math.floor((s + e) / 2);

    if (list[m] === value) {
      return m;
    }

    if (list[m] > value) {
      e = m - 1;
    } 

    if (list[m] < value) {
      s = m + 1;
    }
  }

  return -1;
}

function binaryInsertSearch (list, value, property) {
  let s, e, m;
  if (property) {
    if (value[property] > list[list.length - 1][property]) return list.length;
    if (value[property] < list[0][property]) return 0;
    
    s = 0;
    e = list.length - 1;

    for (let i = 0; i < list.length; i++) {
      m = Math.floor((s + e) / 2);

      if (list[m][property] <= value[property] <= list[m + 1][property]) {
        return m + 1;
      }

      if (list[m][property] > value[property]) {
        e = m - 1;
      } 

      if (list[m][property] < value[property]) {
        s = m + 1;
      }
    }

    return -1;
  } 
  else {
    if (value > list[list.length - 1]) return list.length;
    if (value < list[0]) return 0;
    
    s = 0;
    e = list.length - 1;

    for (let j = 0; j < list.length; j++) {
      m = Math.floor((s + e) / 2);

      if (list[m] <= value <= list[m + 1]) {
        return m;
      }

      if (list[m] > value) {
        e = m - 1;
      } 

      if (list[m] < value) {
        s = m + 1;
      }
    }

    return -1;
  }
}

const _ = {};

_.identity = function (value) {
  return value;
};

_.first = function (array, n = 1) {
  if (n === 1) return array[0];

  const res = [];
  for (let i = 0; i < n && i < array.length; i++) {
    res.push(array[i]);
  }
  return res;
};

_.last = function (array, n = 1) {
  if (n === 1) return array[array.length - 1];

  const res = [];
  for (let i = 0; i < n && i < array.length; i++) {
    res.unshift(array[array.length - 1 - i]);
  }
  return res;
};

_.each = function (list, iteratee, context) {
  if (typeof iteratee !== 'function') return list;
  iteratee = iteratee.bind(context);

  if (Array.isArray(list) || typeof list === 'string') {
    for (let i = 0; i < list.length; i++) {
      iteratee(list[i], i, list);
    }
  } else {
    for (let key in list) {
      iteratee(list[key], key, list);
    }
  }
  return list;
};

_.indexOf = function (array, value, isSorted) {
  if (isSorted) {
    return binarySearch(array, value);
  } else {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) return i;
    }
  }

  return -1;
};

_.filter = function (list, predicate, context) {
  if (typeof predicate !== 'function') predicate = function () { return true; };
  predicate = predicate.bind(context);

  const res = [];
  _.each(list, function (element, index, list) {
    if (predicate(element, index, list)) res.push(element);
  });
  return res;
};

_.reject = function (list, predicate, context) {
  if (typeof predicate !== 'function') predicate = function () { return true; };
  predicate = predicate.bind(context);

  const res = [];
  _.each(list, function (element, index, list) {
    if (!predicate(element, index, list)) res.push(element);
  });
  return res;
};

_.uniq = function (array, isSorted, iteratee) {
  let res = [];
  let seen = [];

  _.each(array, function (value, i, array) {
    let computed = iteratee ? iteratee(value, i, array) : value;
    
    if (isSorted) {
      if (!i || seen !== computed) res.push(value);
      seen = computed;
    } 
    else if (iteratee) {
      if (_.indexOf(seen, computed) === -1) {
        seen.push(computed);
        res.push(value);
      } 
    }
    else if (_.indexOf(res, value) === -1) {
      res.push(value);
    }
  });

  return res;
};

_.map = function (list, iteratee, context) {
  if (typeof iteratee !== 'function') return list;
  iteratee = iteratee.bind(context);

  const res = [];
  _.each(list, function (value, i, list) {
    res.push(iteratee(value, i, list));
  });

  return res;
};

_.pluck = function (obj, key) {
  return _.map(obj, function (o) {
    return o[key];
  });
};

_.reduce = function (list, iteratee, memo, context) {
  iteratee = iteratee.bind(context);
  
  _.each(list, function (value, i, list) {
    if (memo === undefined) memo = value;
    memo = iteratee(memo, value, i, list);
  });
  return memo;
};

_.contains = function (list, value, fromIndex = 0) {
  if (Array.isArray(list)) {
    for (let i = fromIndex; i < list.length; i++) {
      if (list[i] === value) return true;
    }
  } else {
    for (let key in list) {
      if (list[key] === value) return true;
    }
  }
  return false;
};

_.every = function (list, predicate, context) {
  predicate = predicate.bind(context);

  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      if (!predicate(list[i], i, list)) return false;
    }
  } else {
    for (let key in list) {
      if (!predicate(list[key], key, list)) return false;
    }
  }
  return true;
};

_.some = function (list, predicate, context) {
  predicate = predicate.bind(context);

  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      if (predicate(list[i], i, list)) return true;
    }
  } else {
    for (let key in list) {
      if (predicate(list[key], key, list)) return true;
    }
  }
  return false;
};

_.extend = function (destination) {
  if (typeof destination !== 'object' || Array.isArray(destination)) return destination;

  for (let i = 1; i < arguments.length; i++) {
    const obj = arguments[i];
    for (let key in obj) {
      destination[key] = obj[key];
    }
  }

  return destination;
};

_.defaults = function (object) {
  if (typeof object !== 'object' || Array.isArray(object)) return object;

  for (let i = 1; i < arguments.length; i++) {
    const obj = arguments[i];
    for (let key in obj) {
      if (object[key] === undefined) object[key] = obj[key];
    }
  }

  return object;
};

_.once = function (func) {
	let called = false;

	return function () {
		if (!called) func.apply(null, arguments);
		called = true;
	};
};

_.memoize = function (func) {
	const cache = {};

	function meme (n) {
		if (cache[n] === undefined) cache[n] = func.apply(null, arguments);
		return cache[n];	
	}
	meme.cache = cache;
	return meme;
};

_.delay = function (func, wait) {
	const args = Array.prototype.slice.call(arguments, 2);
	
	return setTimeout(function () {
		return func.apply(null, args);
	}, wait);
};

_.shuffle = function (list) {
	const res = _.reduce(list, function (acc, curr) {
		acc.push(curr);
		return acc;
	}, []);
	_.each(res, function (value, i, list) {
		const rand = Math.floor(Math.random() * list.length);
		const tmp = value;
		list[i] = list[rand];
		list[rand] = tmp;
	});
	return res;
};

_.invoke = function (list, methodName) {
	const args = Array.prototype.slice.call(arguments, 2);

	return _.map(list, function (value) {
		return value[methodName].apply(value, args);
	});
};

_.sortBy = function (list, iteratee, context) {
	
	if (typeof iteratee === 'function') {
		iteratee = iteratee.bind(context);
		
		const res = _.reduce(list, function (acc, value, index, list) {
			acc.push({
				value: value,
				index: index,
				compare: iteratee(value, index, list)
			});
			return acc;
		}, []);

		res.sort(function (a, b) {
			return a.compare > b.compare;
		});

		return _.pluck(res, 'value');

	} else {

		const res = _.reduce(list, function (acc, curr) {
			acc.push(curr);
			return acc;
		}, []);

		res.sort(function (a, b) {
			return a[iteratee] > b[iteratee];
		});

		return res;
	}
};

_.zip = function () {
  const arrays = _.map(arguments, function (arg) {
    return arg;
  });

  let longestLength = 0;
  _.each(arrays, function (arr) {
    if (arr.length > longestLength) longestLength = arr.length;
  });

  const res = [];
  for (let i = 0; i < longestLength; i++) {
    res.push(_.map(arrays, function (arr) {
      return arr[i];
    }));
  }

  return res;
};

_.sortedIndex = function (list, value, iteratee, context) {
  if (context) iteratee = iteratee.bind(context);

  return binaryInsertSearch(list, value, iteratee);
};

_.intersection = function () {
  const arrays = _.map(arguments, function (arg) {
    return arg;
  });

  let res = [].concat(arrays[0]);
  _.each(arrays, function (arr) {
    res = _.filter(res, function (elm) {
      return _.contains(arr, elm);
    });
  });

  return res;
};

_.difference = function () {
  const arrays = _.map(arguments, function (arg) {
    return arg;
  });

  let res = [].concat(arrays[0]);
  _.each(arrays, function (arr, i) {
    if (i !== 0) {
      res = _.filter(res, function (elm) {
        return !_.contains(arr, elm);
      });
    }
  });

  return res;
};

_.flatten = function (array, shallow) {
  let newArr = [];

  if (shallow) {
    _.each(array, function (elm) {
      if (!Array.isArray(elm)) {
        newArr.push(elm);
      } else {
        _.each(elm, function (nestedElm) {
          newArr.push(nestedElm);
        });
      }
    });
  } else {
    _.each(array, function (elm) {
      if (!Array.isArray(elm)) {
        newArr.push(elm);
      } else {
        newArr = newArr.concat(_.flatten(elm));
      }
    });
  }

  return newArr;
};

_.throttle = function (func, wait) {
  let canBeCalled = true;

  return function () {
    if (canBeCalled) {
      func.apply(null, arguments);
      canBeCalled = false;
      setTimeout(() => {
        canBeCalled = true;
      }, wait);
    }
  };
};

module.exports = _;