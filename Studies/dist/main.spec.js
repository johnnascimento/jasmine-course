'use strict';

describe('main.js', function () {
    let calculate1 = new Calculate();

    console.log('main.js, calculate1', calculate1);

    describe('Calculate class', function () {
        describe('resetTotal()', function () {
            it('Should reset total', function () {
                calculate1.total = 5;
                console.log('calculate1.total', calculate1.total);

                calculate1.resetTotal();
                console.log('calculate1.total AF', calculate1.total);

                expect(calculate1.total).toBe(0);
            });
        });

        describe('handleInputValue()', function () {
            it('Should segregate numbers from special characters and store them into this.numbers and this.specialChars', function () {
                let numberObj = {
                    numberA: 9,
                    numberB: 2
                };
                let valuePassedIn = '9+2';

                console.log('handleInputValue() : calculate1.numbers', calculate1.numbers);
                console.log('handleInputValue() : calculate1.specialChars', calculate1.specialChars);

                calculate1.numbers = {};
                calculate1.specialChars = '';

                calculate1.handleInputValue(valuePassedIn);

                console.log('handleInputValue() : calculate1.numbers AFT', calculate1.numbers);
                console.log('handleInputValue() : calculate1.specialChars AFT', calculate1.specialChars);

                expect(calculate1.numbers).toEqual(numberObj)
                expect(calculate1.specialChars).toMatch(calculate1.expression);
            });
        });

        describe('getNumbers()', function () {
            it('Should get only numbers from input passed in, as an object containing entries numberA and numberB', function () {
                let numberObj = {
                    numberA: 5,
                    numberB: 3
                };
                let valuePassedIn = '5+3';
                let calcNumberObj = calculate1.getNumbers(valuePassedIn);

                expect(calcNumberObj).toEqual(numberObj);
            });
        });

        describe('getSpecialChar()', function () {
            it('Should get only special characters, such as +, -, / and *', function () {
                let valuePassedIn = '5+3';
                let calcNumberObj = calculate1.getSpecialChar(valuePassedIn);

                expect(calcNumberObj).toMatch(calculate1.expression);
            });
        });

        describe('addInitialValue()', function () {
            it('Should add the initial value from the object numbers.numberA entry', function () {
                let valuePassedIn = '5+3';

                console.log('calculate1.total BF', calculate1.total);

                calculate1.handleInputValue(valuePassedIn)
                calculate1.addInitialValue();

                console.log('calculate1.total AF', calculate1.total);

                expect(calculate1.total).toBe(5);
            });
        });

        describe('validateInput()', function () {
            it('Should add the initial value from the object numbers.numberA entry', function () {
                let valuePassedIn = '5+3';

                console.log('calculate1.total BF', calculate1.total);

                calculate1.handleInputValue(valuePassedIn)

                expect(calculate1.validateInput()).toBeTruthy();
            });
        });
    })
});