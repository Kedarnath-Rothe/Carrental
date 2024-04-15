const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com', 
			port: 587,
			secure: false,
            requireTLS : true,
			auth: {
				user: "kedarnath.22110698@viit.ac.in",
				pass: 'levnlyowohzxbode',
			},
		});

		await transporter.sendMail({
			from: 'kedarnath.22110698@viit.ac.in',
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};