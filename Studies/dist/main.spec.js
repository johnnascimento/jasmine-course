'use strict';

describe('main.js', function () {
    beforeAll(function () {
        this.calculate1 = new Calculate();
        this.valuePassedIn = '';
    });

    console.log('main.js, calculate1');

    describe('Calculate class', function () {
        beforeEach(function() {
            this.calculate1.resetTotal();
        });

        // let calculate1Mock = {
        //     resetTotal: function () { return calculate1Mock },
        //     handleInputValue: function () { return calculate1Mock },
        //     addInitialValue: function () { return calculate1Mock },
        //     handleOperation: function () { return calculate1Mock },
        //     updateResult: function () { return calculate1Mock },
        // }

        it('Calls print value', function () {
            console.log('Validates expression this', this);
            console.log('Validates expression this', this.calculate1.printValue);

            spyOn(this.calculate1, 'resetTotal').and.stub().and.callThrough();
            spyOn(this.calculate1, 'handleInputValue').and.stub().and.callThrough();
            spyOn(this.calculate1, 'addInitialValue').and.stub().and.callThrough();
            spyOn(this.calculate1, 'handleOperation').and.stub().and.callThrough();
            spyOn(this.calculate1, 'updateResult').and.stub();

            this.calculate1.printValue('1+3');

            expect(this.calculate1.resetTotal).toHaveBeenCalled();
            expect(this.calculate1.handleInputValue).toHaveBeenCalled();
            expect(this.calculate1.addInitialValue).toHaveBeenCalled();
            expect(this.calculate1.handleOperation).toHaveBeenCalled();
            expect(this.calculate1.updateResult).toHaveBeenCalled();
        });

        describe('resetTotal()', function () {
            it('Should reset total', function () {
                this.calculate1.total = 5;
                console.log('this.calculate1.total', this.calculate1.total);

                this.calculate1.resetTotal();
                console.log('this.calculate1.total AF', this.calculate1.total);

                expect(this.calculate1.total).toBe(0);
            });
        });

        describe('handleInputValue()', function () {
            it('Should segregate numbers from special characters and store them into this.numbers and this.specialChars', function () {
                let numberObj = {
                    numberA: 9,
                    numberB: 2
                };

                this.valuePassedIn = '9+2';

                console.log('handleInputValue() : this.calculate1.numbers', this.calculate1.numbers);
                console.log('handleInputValue() : this.calculate1.specialChars', this.calculate1.specialChars);

                this.calculate1.numbers = {};
                this.calculate1.specialChars = '';

                spyOn(this.calculate1, 'getNumbers').and.stub().and.callThrough();
                spyOn(this.calculate1, 'getSpecialChar').and.stub().and.callThrough();

                this.calculate1.handleInputValue(this.valuePassedIn);

                console.log('handleInputValue() : this.calculate1.numbers AFT', this.calculate1.numbers);
                console.log('handleInputValue() : this.calculate1.specialChars AFT', this.calculate1.specialChars);

                expect(this.calculate1.numbers).toEqual(numberObj)
                expect(this.calculate1.specialChars).toMatch(this.calculate1.expression);
                expect(this.calculate1.getNumbers).toHaveBeenCalledWith(this.valuePassedIn);
                expect(this.calculate1.getSpecialChar).toHaveBeenCalledWith(this.valuePassedIn);
            });
        });

        describe('getNumbers()', function () {
            it('Should get only numbers from input passed in, as an object containing entries numberA and numberB', function () {
                let calcNumberObj,
                    splitSpy,
                    numberObj = {
                        numberA: 5,
                        numberB: 3
                    };

                this.valuePassedIn = '5+3';


                calcNumberObj = this.calculate1.getNumbers(this.valuePassedIn);

                expect(calcNumberObj).toEqual(numberObj);
            });
        });

        describe('getSpecialChar()', function () {
            it('Should get only special characters, such as +, -, / and *', function () {
                this.valuePassedIn = '5+3';

                let calcNumberObj = this.calculate1.getSpecialChar(this.valuePassedIn);

                expect(calcNumberObj).toMatch(this.calculate1.expression);
            });
        });

        describe('addInitialValue()', function () {
            it('Should add the initial value from the object numbers.numberA entry', function () {
                this.valuePassedIn = '5+3';

                console.log('calculate1.total BF', this.calculate1.total);

                this.calculate1.handleInputValue(this.valuePassedIn)
                this.calculate1.addInitialValue();

                console.log('this.calculate1.total AF', this.calculate1.total);

                expect(this.calculate1.total).toBe(5);
            });
        });

        describe('validateInput()', function () {
            beforeEach(function () {
                this.validatedInput;
                this.valuePassedIn = '5+3';
            });

            it('Validates expression when the first number is invalid', function() {
                this.valuePassedIn = 'a+3';
                this.calculate1.handleInputValue(this.valuePassedIn);
                this.validatedInput = this.calculate1.validateInput();
                console.log('this.validatedInput ', this.validatedInput);

                expect(this.validatedInput).toBeFalsy();
            });

            it('Validates expression when the second number is invalid', function() {
                this.valuePassedIn = '3+a';
                this.calculate1.handleInputValue(this.valuePassedIn);
                this.validatedInput = this.calculate1.validateInput();
                console.log('this.validatedInput ', this.validatedInput);

                expect(this.validatedInput).toBeFalsy();
            });

            it('Validates expression when operation is invalid', function() {
                spyOn(Calculate.prototype, 'validateInput');

                this.valuePassedIn = '3_4';
                this.calculate1.handleInputValue(this.valuePassedIn);
                this.validatedInput = this.calculate1.validateInput();
                console.log('this.validatedInput ', this.validatedInput);

                expect(this.validatedInput).toBeFalsy();
                expect(this.calculate1.errorMsg).toBe('Operation unrecognized!');
                expect(Calculate.prototype.validateInput).toHaveBeenCalledTimes(1);
            });

            it('Should add the initial value from the object numbers.numberA entry', function () {
                console.log('this.calculate1.total BF', this.calculate1.total);

                this.calculate1.handleInputValue(this.valuePassedIn);

                expect(this.calculate1.validateInput()).toBeTruthy();
            });
        });

        describe('handleOperation()', function () {
            describe('Switch operation', function () {
                beforeEach(function () {
                    this.calculate1.resetTotal();
                });

                it('Should add value based on the value passed in', function () {
                    spyOn(Calculate.prototype, 'add');

                    this.valuePassedIn = '5+3';

                    // this.calculate1.handleInputValue(this.valuePassedIn).addInitialValue();

                    this.calculate1.printValue(this.valuePassedIn);

                    console.log('this.calculate1.numbers.numberA', this.calculate1.numbers.numberA);
                    console.log('this.calculate1.numbers.numberB', this.calculate1.numbers.numberB);

                    // this.calculate1.handleOperation();

                    expect(Calculate.prototype.add).toHaveBeenCalledTimes(2);
                    expect(Calculate.prototype.add).toHaveBeenCalledWith(5);
                    expect(Calculate.prototype.add).toHaveBeenCalledWith(3);
                });

                it('Should subtract value based on the value passed in', function () {
                    this.valuePassedIn = '5-3';

                    this.calculate1.handleInputValue(this.valuePassedIn).addInitialValue();

                    console.log('this.calculate1.numbers.numberA', this.calculate1.numbers.numberA);
                    console.log('this.calculate1.numbers.numberB', this.calculate1.numbers.numberB);

                    this.calculate1.handleOperation();

                    expect(this.calculate1.result).toBe(2);
                });

                it('Should multiply value based on the value passed in', function () {
                    this.valuePassedIn = '5*3';

                    this.calculate1.handleInputValue(this.valuePassedIn).addInitialValue();

                    console.log('calculate1.numbers.numberA', this.calculate1.numbers.numberA);
                    console.log('this.calculate1.numbers.numberB', this.calculate1.numbers.numberB);

                    this.calculate1.handleOperation();

                    expect(this.calculate1.result).toBe(15);
                });

                it('Should divide value based on the value passed in', function () {
                    this.valuePassedIn = '6/2';

                    this.calculate1.handleInputValue(this.valuePassedIn).addInitialValue();

                    console.log('this.calculate1.numbers.numberA', this.calculate1.numbers.numberA);
                    console.log('this.calculate1.numbers.numberB', this.calculate1.numbers.numberB);

                    this.calculate1.handleOperation();

                    expect(this.calculate1.result).toBe(3);
                });
            })
        });

        describe('updateResult()', function() {
            beforeAll(function () {
                const element = document.createElement('div');
                element.setAttribute('id', 'testResult');
                element.innerText = '5';

                document.body.appendChild(element);

                this.element = element;
            });

            afterAll(function () {
                document.body.removeChild(this.element);
            });

            it('Should update the DOM with the calculator\'s result', function() {
                expect(parseInt(this.element.innerText)).toBe(5);
            });
        });
    });
});