'use strict';

/*

SETUP AND TEARDOWN EXAMPLES

SETUP:
    beforeAll(): Executes once before all specs within my suite
    beforeEach(): Executes the number of times correspondent to the specs within my suite before each spec

TEARDOWN:
    afterEach(): Executes the number of times correspondent to the specs within my suite after each spec
    afterAll(): Executes once after all specs within my suite

- The order of execution is exactly as placed above

*/

describe('calculator.js', function () {
    describe('Calculator class', function () {
        let calculator,
            calculator2;

        beforeEach(function () {
            // Anything inside this block gets executed before
            // each spec (it) inside this describe block

            calculator = new Calculator();
            calculator2 = new Calculator();
        });

        afterEach(function () {
            // Anything inside this block gets executed after
            // each spec (it) inside this describe block
        });

        it('Has Constructor', function () {
            // expect(calculator).toBe(calculator2); This will fail as it doesn't compare deeply both constructors
            expect(calculator).toEqual(calculator2);
        });

        it('Can be instantiated', function () {
            jasmine.addMatchers(customMatchers);

            expect(calculator).toBeCalculator(); // Custom Matcher
            expect(2).not.toBeCalculator(); // Custom Matcher
            // expect(calculator).not.toBeCalculator(); // This will throw the error within result.pass condition
            expect(calculator).toBeTruthy();
            expect(calculator2).toBeTruthy();
            expect(calculator).toEqual(calculator2);
            expect(calculator.constructor.name).toContain('Calc');
        });

        it('Instantiates unique object', function () {
            expect(calculator).not.toBe(calculator2);
        });

        it('Has common operations', function () {
            expect(calculator.add).toBeDefined();
            expect(calculator.add).not.toBeUndefined();
            expect(calculator.subtract).toBeDefined();
            expect(calculator.multiply).toBeDefined();
            expect(calculator.divide).toBeDefined();
        });

        describe('properties', function () {
            describe('total', function () {
                it('Can Overwrite total', function () {
                    calculator.total = null;
                    expect(calculator.total).toBeNull();
                });

                it('Should initialize the total', function () {
                    calculator = new Calculator();

                    expect(calculator.total).toBe(0);
                });
            });
        });

        describe('methods', function () {
            describe('add()', function () {
                it('Should add numbers to total', function () {
                    calculator.total = 0;
                    calculator.add(5);

                    // Expects total to be 5
                    console.log('calculator add', calculator.total);
                    expect(calculator.total).toBe(5);
                });

                it('Returns total', function () {
                    calculator.total = 50;

                    expect(calculator.add(20)).toBe(70);
                    expect(calculator.total).toMatch(/-?\d+/);
                    expect(typeof calculator.total).toMatch('number');

                    // Asymetric matchers!
                    // Not equal in each side!
                    expect(calculator.total).toEqual(jasmine.anything());
                    expect(function () {}).toEqual(jasmine.anything());
                });
            });

            describe('subtract()', function () {
                it('Should subtract numbers from total', function () {
                    calculator.total = 5;
                    calculator.subtract(2);

                    // Expects total to be 3
                    console.log('calculator subtract', calculator.total);

                    expect(calculator.total).toBe(3);
                });
            });

            describe('multiply()', function () {
                it('Should multiply total by numbers', function () {
                    calculator.total = 3;
                    calculator.multiply(5);

                    // Expects total to be 10

                    console.log('calculator multiply', calculator.total);
                    expect(calculator.total).toBe(15);
                });

                it('Does not handle NaN', function () {
                    calculator.total = 20;
                    calculator.multiply('a');

                    expect(calculator.total).toBeNaN();
                });
            });

            describe('divide()', function () {
                it('Should divide total by numbers', function () {
                    calculator.total = 15;
                    calculator.divide(3);

                    // Expects total to be 2

                    console.log('calculator divide', calculator.total);
                    expect(calculator.total).toBe(5);
                });

                it('Handles divide by zero', function () {
                    expect(function () {
                        calculator.divide(0);
                    }).toThrow();

                    expect(function () {
                        calculator.divide(0);
                    }).toThrowError(Error);

                    expect(function () {
                        calculator.divide(0);
                    }).toThrowError(Error, 'You can\'t divide a number by zero');
                });
            });
        });
    });
});
