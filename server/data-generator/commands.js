const { random } = require('faker/locale/en');
const isAfter = require('date-fns/is_after');
const subDays = require('date-fns/sub_days');
const {
    randomDate,
    randomFloat,
    weightedArrayElement,
    weightedBoolean 
} = require('./utils');

module.exports = (db, { serializeDate }) => {
    const today = new Date();
    const aMonthAgo = subDays(today, 30);

    return Array.from(Array(600).keys()).map((id) => {
        const total_ex_taxes = db.baskets.filter((basket) => basket.command_id == id).reduce(
            (total, product) =>
                total +
                db.products[product.product_id].price * product.quantity,
            0
        );

        const delivery_fees = randomFloat(3, 8);
        const tax_rate = random.arrayElement([0.12, 0.17, 0.2]);
        const taxes = parseFloat(
            ((total_ex_taxes + delivery_fees) * tax_rate).toFixed(2)
        );
        const customer = random.arrayElement(
            db.customers.filter(customer => customer.has_ordered)
        );
        const date = randomDate(customer.first_seen, customer.last_seen);

        const status =
            isAfter(date, aMonthAgo) && random.boolean()
                ? 'ordered'
                : weightedArrayElement(['delivered', 'cancelled'], [10, 1]);
        return {
            id,
            reference: random.alphaNumeric(6).toUpperCase(),
            date: serializeDate ? date.toISOString() : date,
            customer_id: customer.id,
            total_ex_taxes: total_ex_taxes,
            delivery_fees: delivery_fees,
            tax_rate: tax_rate,
            taxes: taxes,
            total: parseFloat(
                (total_ex_taxes + delivery_fees + taxes).toFixed(2)
            ),
            status: status,
            returned: status == 'delivered' ? weightedBoolean(10) : false,
        };
    });
};
