'use strict';

/**
 * @class
 * @constructor
 */
class Calculate extends Calculator {
    constructor() {
        super();

        this.expression = /\+|\-|\/|\*/gmi;
        this.numbers;
        this.specialChars;
        this.result;
        this.resultElem = 'result';
        this.errorMsg = '';
    }

    getNumbers(inputValue) {
        let splitNumbers = inputValue.split(this.expression),
            numberA = parseInt(splitNumbers[0]),
            numberB = parseInt(splitNumbers[1]);

        return {
            numberA: numberA,
            numberB: numberB
        };
    }

    getSpecialChar(inputValue) {
        let operatorChar = inputValue.match(this.expression);

        if (operatorChar === null || operatorChar === undefined || operatorChar === '') {
            this.errorMsg = 'Operation unrecognized!';
            this.total = this.errorMsg;

            return this.total;
        }

        return operatorChar[0];
    }

    getDomElem(id) {
        return document.getElementById(id);
    }

    resetTotal() {
        this.total = 0;

        return this;
    }

    handleInputValue(inputValue) {
        this.numbers = this.getNumbers(inputValue);
        this.specialChars = this.getSpecialChar(inputValue);

        console.log('this.numberA', this.numbers.numberA);
        console.log('this.numberB', this.numbers.numberB);
        console.log('this.specialChars', this.specialChars);

        return this;
    }

    validateInput() {
        if (Number.isNaN(this.numbers.numberA) || Number.isNaN(this.numbers.numberB)) {
            this.errorMsg = 'Operation unrecognized!';
            this.specialChars = '';
            this.total = this.errorMsg;

            return false;
        }

        return true;
    }

    addInitialValue() {
        if (this.validateInput()) {
            this.add(this.numbers.numberA);
        }

        return this;
    }

    handleOperation() {
        console.log('handleOperation this.specialChars[0]', this.specialChars[0]);

        switch (this.specialChars) {
            case '+':
                this.result = this.add(this.numbers.numberB);
                console.log('Add this.result', this.result);
                break;

            case '-':
                this.result = this.subtract(this.numbers.numberB);
                console.log('subtract this.result', this.result);
                break;

            case '*':
                this.result = this.multiply(this.numbers.numberB);
                console.log('multiply this.result', this.result);
                break;

            case '/':
                this.result = this.divide(this.numbers.numberB);
                console.log('divide this.result', this.result);
                break;
            default:
                this.result = this.errorMsg;
                console.log('this.errorMsg', this.errorMsg);
                break;
        }

        return this;
    }

    updateResult() {
        let $resultElem = this.getDomElem(this.resultElem);

        console.log('$resultElem', $resultElem);

        if ($resultElem) {
            $resultElem.innerText = this.result;
        }

        return this;
    }

    printValue(inputValue) {
        this.resetTotal().handleInputValue(inputValue).addInitialValue().handleOperation().updateResult();

        return console.log('this.result is: ', this.result);
    }
}

var calculator = new Calculate();
