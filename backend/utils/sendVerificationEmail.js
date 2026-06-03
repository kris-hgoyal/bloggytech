const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const sendAccountVerificationEmail = async (to, verificationToken) => {
    try{
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.APP_PWD
            }
        });
        const message = {
            to: to,
            subject: 'Account Verification',
            text: `Please verify your account by clicking the following link: ${verificationToken}`,
            html: `<p>Please verify your account by clicking the following link:</p>
                   <a href="http://localhost:3000/verify-account/${verificationToken}">Verify Account</a>
                   <h1>${verificationToken}</h1>
                   <p>If you did not request this, please ignore this email.</p>`
        };
        // Send the email
        const info = await transporter.sendMail(message);
        console.log("Email sent successfully: ", info.messageId);
    }
    catch(error) {
        console.error("Error in creating transporter: ", error);
        throw error;
    }
}

module.exports = sendAccountVerificationEmail;