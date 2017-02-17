var _ = {};

function simpleSearch (list, item) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] === item) {
            return i;
        }
    }
    
    return -1;
}

function binarySearch (list, item) {
    var s = 0;
    var e = list.length - 1;
    for (var loop = 0; loop < 8; loop++) {
        var m = Math.floor((s + e) / 2);
        if (list[m] === item) {
            return m;
        }
        if (list[m] > item) {
            e = m - 1;
        }
        if (list[m] < item) {
            s = m + 1;
        }
    }
    return -1;
}

_.indexOf = function (array, value, isSorted = false) {
    if (isSorted) {
        return binarySearch(array, value);
    } else {
        return simpleSearch(array, value);
    }
};

_.once = function (func) {
    var allowed = true;    

    return function () {
        if (allowed) {
            allowed = false;
            return func.apply(null, arguments);
        }
    };
};

_.memoize = function (func) {
    var cache = {};

    return function () {
        if (cache[arguments[0]]) {
            return cache[arguments[0]];
        }

        var result = func.apply(null, arguments);
        cache[arguments[0]] = result;
        return result;   
    };
};

_.delay = function (func, wait) {
    var args = [];

    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    setTimeout(function () {
        return func.apply(null, args);
    }, wait);
};

_.shuffle = function (list) {
    var result = [];
   var copy = list.slice();
    while (copy.length !== 0) {
       var random = Math.floor(Math.random() * copy.length);
       result.push(copy[random]);
       copy.splice(random, 1);
   }
   return result;
};

_.invoke = function () {
    
};

console.log(_.shuffle([1,2,3,4,5,6,7,8,9]));

module.exports = _;