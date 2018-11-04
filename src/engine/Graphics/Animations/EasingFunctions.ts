/*

    NOT IMPLEMENTED, no need for my cocept of game

*/

export const EasingFunctions = {
    linear: function (t: number) { return t },
    easeInQuad: function (t: number) { return t * t },
    easeOutQuad: function (t: number) { return t * (2 - t) },
    easeInOutQuad: function (t: number) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
    easeInCubic: function (t: number) { return t * t * t },
    easeOutCubic: function (t: number) { return (--t) * t * t + 1 },
    easeInOutCubic: function (t: number) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
    easeInQuart: function (t: number) { return t * t * t * t },
    easeOutQuart: function (t: number) { return 1 - (--t) * t * t * t },
    easeInOutQuart: function (t: number) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
    easeInQuint: function (t: number) { return t * t * t * t * t },
    easeOutQuint: function (t: number) { return 1 + (--t) * t * t * t * t },
    easeInOutQuint: function (t: number) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
}

function map(value: number, inFromVal: number, inToVal: number, outFromVal: number, outToVal: number) {
    return (value - inFromVal) / (inToVal - inFromVal) * (outToVal - outFromVal) + outFromVal;
}

export function ease(t: number, fromValue: number, toValue: number, easingFunction: Function) {
    let mappedValue = map(t, fromValue, toValue, 0, 1);
    let value = easingFunction(mappedValue);
    return map(value, 0, 1, fromValue, toValue);
}
