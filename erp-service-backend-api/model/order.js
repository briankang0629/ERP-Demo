const { DB } = require('../config/db');

module.exports = {
    total() {
        return new Promise((resolve, reject) => {
            DB('orders').count('order_id as total').then((rows) => {
                resolve(rows[0]);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    lists() {
        return new Promise((resolve, reject) => {
            DB('orders').select('*').then((rows) => {
                resolve(rows);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    /**
     * info
     * @param orderId
     * @return {Promise<unknown>}
     */
    info(orderId = 0) {
        return new Promise((resolve, reject) => {
            DB('orders').select('*').where('order_id', '=', orderId).then((rows) => {
                resolve(rows[0]);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    create(params) {
        return new Promise((resolve, reject) => {
            DB('orders').insert(params).then((rows) => {
                resolve(rows);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    update(params, id) {
        return new Promise((resolve, reject) => {
            DB('orders').update(params).where('order_id', id).then((rows) => {
                resolve(rows);
            }).catch((err) => {
                reject(err);
            });
        });
    },
}
