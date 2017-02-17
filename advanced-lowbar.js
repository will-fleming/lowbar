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

_.delay = function (func, delay) {
    
};

module.exports = _;