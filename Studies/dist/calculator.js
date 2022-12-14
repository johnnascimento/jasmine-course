'use strict';

/**
 * @class
 * @constructor
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
