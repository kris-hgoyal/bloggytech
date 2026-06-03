const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const sendEmail = async (to, resetToken) => {
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
            subject: 'Password Reset Request',
            text: `You requested a password reset. Use the following token to reset your password: ${resetToken}`,
            html: `<p>You requested a password reset.</p>
                   <p>Use the following link to reset your password:</p>
                   <a href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a>
                   <h1>${resetToken}</h1>
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

module.exports = sendEmail;