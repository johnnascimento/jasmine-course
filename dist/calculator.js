'use strict';

/**
 * @class
 * @constructor
 * @Description Calculator constructor used mainly to create a calculator which divide, multiply, add and subtract values.
 */
class Calculator {
    constructor() {
        this.total = 0;
    }

    add(number) {
        return this.total += number;
    }

    subtract(number) {
        return this.total -=  number;
    }

    multiply(number) {
        return this.total *=  number;
    }

    divide(number) {
        if (number === 0) throw new Error('You can\'t divide a number by zero');
        return this.total /=  number;
    }
}

Object.defineProperty(Calculator.prototype, 'version', {
    get: function() {
        return fetch('https://raw.githubusercontent.com/johnnascimento/jasmine-course/main/Studies/calculator-data.json')
            .then(function(result) {
                console.log('result', result)

                return result.json();
            })
            .then(function(json) {
                console.log('json', json)

                return json.version;
            });
    },
    enumerable: true,
    configurable: true
});
