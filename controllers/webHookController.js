const axios = require('axios');
const constants = require('../constants/constants')
const quiqResponseParser = require('../utils/quiq-response-parser')

exports.getOrderDetailByOrderNumberAndpostalCode = async (req, res, next) => {
    const postalCode = req.body.conversation.custom.zipCode;
    const orderNumber = req.body.conversation.custom.orderNumber;
    try {
        let response = await axios.get(`${constants.ORDER_DETAILS_API_URL}`,{
            params: {
                postalCode,
                orderNumber
            }
        })
        // let response = await axios({
        //     method: 'get',
        //     headers: {
        //         'Accept-Encoding': 'gzip, deflate, br',
        //         'Accept': '*/*',
        //         'Content-Type': 'application/json'
        //     },
        //     url: `${constants.ORDER_DETAILS_API_URL}`,

        // });
        res.statusCode = 200;
        let responseObject = { actions: quiqResponseParser.createOrderDetailActions(response.data.orderDetailBean.orderData, postalCode, orderNumber), waitForCustomerResponseOverride: { shouldWait: false } }
        res.json(responseObject);
    }
    catch (e) {
        res.statusCode = 500;
        res.json({ error: "Something went wrong" });
        console.log(e);
    }

};