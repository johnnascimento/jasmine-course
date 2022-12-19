'use strict';

describe('calculator.js', function () {
    const calculator = new Calculator();

    it('Should add numbers to total', function () {
        calculator.total = 0;
        calculator.add(5);

        // Expects total to be 5
        console.log('calculator add', calculator.total);
        expect(calculator.total).toBe(5);
    });

    it('Should subtract numbers from total', function () {
        calculator.total = 5;
        calculator.subtract(2);

        // Expects total to be 3
        console.log('calculator subtract', calculator.total);

        expect(calculator.total).toBe(3);
    });

    it('Should multiply total by numbers', function () {
        calculator.total = 3;
        calculator.multiply(5);

        // Expects total to be 10

        console.log('calculator multiply', calculator.total);
        expect(calculator.total).toBe(15);
    });

    it('Should divide total by numbers', function () {
        calculator.total = 15;
        calculator.divide(3);

        // Expects total to be 2

        console.log('calculator divide', calculator.total);
        expect(calculator.total).toBe(5);
    });
});
