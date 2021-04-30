const sendGrid = require('@sendgrid/mail');
const sendGridApiKey = process.env.sendGridApiKey; 

sendGrid.setApiKey(sendGridApiKey);

const sendWelcomeEmail =(email,name)=>{
    sendGrid.send({
        to: email,
        from:'deepesharya82246@gmail.com',
        subject:"Doing the task",
        text:  ` Respected ${name}, we have got your message. We will get back to you. Thanks for reading the email.`,
        html: '<h1>Completing the task.</h1>'
    })
}

module.exports = sendWelcomeEmail;
