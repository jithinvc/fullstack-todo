const fs = require('fs');

const mailer = require('./mailer');

const sendPromotionalEmail = async function(receiver) {
  // edit config.js for your gmail credentials

  const params = {
    to: [receiver], // list of receivers
    subject: 'First dynamic email',
    text: `checkout this carousel.`,
    html: `
      <p>Please rate our flowers</p>
      <p>
        Please enable dyanmic email
      </p>
    `,
    amp: ''
  };

  try {
    // read the dynamic-email html file
    params.amp = await new Promise((resolve, reject) => {
      // path relative to app.js
      fs.readFile('./server/email-templates/firstemail.html', (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    return mailer.sendEmail({}, params);
  } catch (error) {
    throw error;
  }
};

module.exports = {
    sendPromotionalEmail
};