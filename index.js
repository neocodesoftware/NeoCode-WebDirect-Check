'use strict';
const puppeteer = require('puppeteer');
const config = require('./config.js');
const nodemailer = require('nodemailer');

(async() => {

// Starts a headless chtome browser and creates a page object
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Go to that page and wait for three seconds after network has loaded to idle
await page.goto(config.config.page_address, {networkIdleTimeout: 3000, waitUntil: 'networkidle'});

// Wait for the results to show up
// await page.waitForSelector('span');

// Extract the results from the page
const content = await page.evaluate((check_str_arg) => {
  // Find all the "span" tags on page 
  const spans = Array.from(document.querySelectorAll('span'));
  let webd_ok = false;
  const check_str = check_str_arg;
  const regex = new RegExp(check_str);  

  // If one of those tags matches the checker string, set the checker value to success
  spans.forEach(function(item){
  	
  	if (regex.test(item.textContent)) {
  		webd_ok = true;
  	}  
  })

  let result = {"test": webd_ok, "spans": spans.map(span => span.textContent)} 

  return result;
}, config.config.check_str/*page address from config file*/);

// You can use the console.logs below to see what results you are getting out of the page scan
// console.log(content.spans.join('\n'));
// console.log(content.test);

const webd_ok = content.test;

// Screenshot the page and email the png of it to the user if the test failed
if(!webd_ok){
    //if last three letters of filename are png, send png, otherwise send pdf
    await page.screenshot({path: config.config.filename});
    
    let transporter = nodemailer.createTransport({
      host: config.config.smtp_host,
      port: config.config.smtp_port,
        secure: config.config.smtp_port == 465, // true for 465, false for other ports
        auth: {
          user: config.config.user, 
          pass: config.config.pass  
        }
      });

    // setup email data
    let mailOptions = {
        from: config.config.email_from_name+" <"+config.config.email_from+">", // sender address
        to: config.config.email_to, // list of receivers
        subject: config.config.email_subject, // Subject line
        text: config.config.email_message, // plain text body
        attachments: [
        {
          filename: config.config.filename,
          path: './'+config.config.filename,
          cid: config.config.filename
        }]
      };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });

  }

  await browser.close();

})();