const { random } = require('faker/locale/en');
const { weightedArrayElement } = require('./utils');

module.exports = () => {
    return Array.from(Array(600).keys()).map(id => {
        const nbProducts = weightedArrayElement(
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            [30, 20, 5, 2, 1, 1, 1, 1, 1, 1]
        );
        return Array.from(Array(nbProducts).keys()).map(() => ({
            command_id: id,
            product_id: random.number({ min: 0, max: 10 * 13 - 1 }),
            quantity: weightedArrayElement([1, 2, 3, 4, 5], [10, 5, 3, 2, 1]),
        }));
    });
};