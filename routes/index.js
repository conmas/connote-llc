var dotenv = require('dotenv').config();
var express = require('express');
var router = express.Router();
const { check,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const axios = require('axios');
const querystring = require('querystring');
const API_KEY = process.env.MAILGUN_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
const secret = process.env.CAPTCHA_SECRET;

const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Connote' });
});

/* GET work page. */
router.get('/work', function(req, res, next) {
    res.render('work', { title: 'Work' });
});

/* GET team page. */
router.get('/team', function(req, res, next) {
    res.render('team', { title: 'Team' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact' });
});

router.post('/', 
	// [
	// check('first', 'Please enter normal characters only.').isAscii().trim(),
	// check('first', 'Please enter your first name.').isLength({min:1}).trim(),
	// check('last', 'Please enter normal characters only.').isAscii().trim(),
	// check('last', 'Please enter your last name.').isLength({min:1}).trim(),
	// check('email', 'Please enter an email address.').isLength({min:1}).trim(),
	// check('email', 'Please enter a valid email address.').isEmail().trim(),
	// check('message', 'Please enter a message.').isLength({min:1}).trim()
	// ], 
	function(req, res, next) {

		// deal with errors from the form validation
		// const errors = validationResult(req);
  // 		if (!errors.isEmpty()) {
  //   		return res.status(422).json({ errors: errors.array() });
  // 		}

  		// if no validation errors, then create the email
		let data = {
			from: req.body.email,
			to: process.env.MAILGUN_TO_ADDRESS,
			subject: 'A Connote request from ' + req.body.email,
			text: req.body.message
		};

		let captchaResponse = req.body['g-recaptcha-response'];

		axios({
			method:'post',
			url:'https://www.google.com/recaptcha/api/siteverify',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			data: querystring.stringify({
				secret: secret,
				response: captchaResponse
			})
		}).then(function(response) {
			if(response.data.success===true) {
				//send the email
				mailgun.messages().send(data, (error, body) => {
					if(error) {
						console.log(error);
						res.redirect('/');
					} else {
						console.log('An email from ' + req.body.email + ' was sent to ' + process.env.MAILGUN_TO_ADDRESS);
						res.render('index', {title: 'Connote', element: 'thanks'});
					}
				});
			} else {
				console.log('something went wrong with captcha');
				res.redirect('/');
			};
		});		
});

module.exports = router;
