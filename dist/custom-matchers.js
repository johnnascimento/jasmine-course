const customMatchers = {
    toBeCalculator: function() {
        return {
            compare: function(actual) {
                const result = {
                    pass: actual instanceof Calculator,
                    message: ''
                }

                if (result.pass) {
                    result.message = 'Expected ' + actual + ' not to be instance of Calculator';
                } else {
                    result.message = 'Expect ' + actual + ' to be instance of Calculator';
                }

                return result;
            }
        }
    }
};