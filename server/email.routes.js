const express = require('express')
const utils = require('./serverutils')
const router = new express.Router()

router.get('/send', function(req, res) {
    const params = req.query;
    const receiverEmail = params.email;
    if (receiverEmail) {
      utils.sendPromotionalEmail(receiverEmail)
        .then(data => {
          res.json({
            success: true,
            response: {
              envelope: data.envelope,
              messageId: data.messageId
            }
          });
        })
        .catch(error => {
          res.json({
            success: false,
            message: error.message
          });
        });
    } else {
      res.json({
        success: false,
        message: 'No recipient found'
      });
    }
  });

  module.exports = (app) => {
    app.use('/api/email', router)
  }; 