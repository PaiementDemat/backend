const express = require('express');

const router = express.Router();

const Transaction = require('../controllers/transaction.controller');

router.post('/', async function (req, res) {
    try {
        
        Transaction.pay(req).then(

            transaction => res.send({
                status: 'success',
                transaction_key: transaction.transaction_key
            }),
    
            errors => res.send({
                status: 'error',
                errors
            })

        )

    } catch (error) {
        throw error
    }
});

module.exports = router;