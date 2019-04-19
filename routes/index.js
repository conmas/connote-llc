var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Connote' });
});

router.post('/', function(req, res) {

	nodemailer.createTestAccount((err, account) => {
		if (err) {
			console.error('Failed to create a test account. ' + err.message);
			return process.exit(1);
		}

		console.log('Credentials obtained, sending message...');
	})

	const transporter = nodemailer.createTransport({
	    host: 'smtp.ethereal.email',
	    port: 587,
	    auth: {
	        user: 'ena.tremblay@ethereal.email',
	        pass: 'h6GHX7gEfRNmMdpJKe'
	    }
	});

	let message = {
		from: req.body.email,
		to: 'ena.tremblay@ethereal.email',
		subject: 'Please help me connote. Love, ' + req.body.email,
		text: req.body.message
	}

	transporter.sendMail(message, (err, info) => {
		if (err) {
			console.log('Error occurred. ' + err.message);
			return process.exit(1);
		}

		console.log("Message sent: %s", info.messageId);
		// Preview only available when sending through an Ethereal account
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	})

	res.redirect('/thanks');

});

router.get('/thanks', function(req, res, next){
	res.render('thanks');
})


module.exports = router;
