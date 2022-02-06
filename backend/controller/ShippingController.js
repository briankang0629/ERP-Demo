const orderModel = require('../model/order');
const dayjs = require('dayjs');

module.exports = {
    /**
     * index
     * @param request
     * @param response
     * @param next
     * @return {Promise<*>}
     */
    async index(request, response, next) {
        const data = {
            data: [],
            pagination: {},
        };

        await orderModel.total().then(results => {
            data.pagination.total = results.total;
        })

        await orderModel.lists().then(results => {
            results.forEach((item) => {
                item.shipping_date = dayjs(item.shipping_date).format('YYYY-MM-DD');
                item.created_at = dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss');
                item.updated_at = dayjs(item.updated_at).format('YYYY-MM-DD HH:mm:ss');
                data.data.push(item);
            });
        })

        return response.send(data);
    },

    /**
     * info
     * @param request
     * @param response
     * @param next
     * @return {Promise<*>}
     */
    async info(request, response, next) {
        const orderId = request.params.id;

        let data = {};
        await orderModel.info(orderId).then(results => {
            if (!results) {
                return response.status(404).send({
                    msg: "查無此資料"
                });
            }
            results.shipping_date = dayjs(results.shipping_date).format('YYYY-MM-DD');
            results.created_at = dayjs(results.created_at).format('YYYY-MM-DD HH:mm:ss');
            results.updated_at = dayjs(results.updated_at).format('YYYY-MM-DD HH:mm:ss');

            data = results;
        })

        return response.send(data);
    },

    async save(request, response, next) {
        let params = {
            order_number: request.body.order_number,
            content: request.body.content,
            shipping_type: request.body.shipping_type,
            shipping_date: request.body.shipping_date,
        };

        // create
        if (request.params.id === undefined) {
            if (!params.order_number) {
                return response.status(403).send({
                    msg: "請輸入訂單編號"
                });
            }

            if (!params.content) {
                return response.status(403).send({
                    msg: "請輸入訂單內容"
                });
            }

            if (!params.shipping_type) {
                return response.status(403).send({
                    msg: "請輸入訂單方式"
                });
            }

            if (!params.shipping_date) {
                return response.status(403).send({
                    msg: "請輸入出貨日期"
                });
            }
            // 新增日期
            params.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');

            await orderModel.create(params).then(results => {
                return response.send({
                    msg: "新增成功"
                });
            })
        } else { // update
            await orderModel.info(request.params.id).then(results => {
                if (!results) {
                    return response.status(404).send({
                        msg: "查無此資料"
                    });
                }
            })

            Object.keys(params).forEach(key => {
                if (!params[key]) {
                    delete params[key];
                }
            });

            await orderModel.update(params, request.params.id).then(results => {
                return response.send({
                    msg: "更新成功"
                });
            })
        }
    },
}