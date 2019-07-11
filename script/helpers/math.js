//
// math.js
// =========
// Miscellaneous math functions.
// (Reused from my old project.)
//

function random_float(min, max) {
    return min + (Math.random() * (max - min));
}

function random_int(min, max) {
    return Math.floor(min + (Math.random() * (max - min)));
}

function contain_number(n, min, max) {
    if (n < min) { return min; }
    if (n > max) { return max; }
    return n;
}

function collision(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw &&
            ax + aw > bx &&
            ay > by - bh &&
            -ah + ay < by;
}

function flatten_arrays(arr) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
        result = result.concat(arr[i]);
    }

    return result;
}