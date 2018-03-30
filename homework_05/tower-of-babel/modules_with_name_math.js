let _sqrt = function (s, x, last) {
    return x != last ? _sqrt(s, (x + s / x) / 2.0, x) : x;
};

export const mathObj = {
    PI: 3.141592,
    sqrt: function(s) {
        return _sqrt(s, s / 2.0, 0.0);
    },
    square: function(x) {
        return x * x;
    },
};