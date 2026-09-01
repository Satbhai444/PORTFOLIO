import nodemailer from 'nodemailer';

/**
 * Create a reusable Nodemailer transporter
 * Configured for Gmail SMTP (can be changed for other providers)
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Send a contact form email notification
 * @param {Object} data - { name, email, message }
 * @returns {Promise<boolean>} - true if sent successfully
 */
export const sendContactEmail = async ({ name, email, message }) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `🚀 New Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">New Contact Message</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.6); font-size: 14px;">From your portfolio website</p>
          </div>
          <div style="padding: 32px;">
            <div style="margin-bottom: 24px;">
              <p style="color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 4px;">Name</p>
              <p style="margin: 0; font-size: 16px; font-weight: 500;">${name}</p>
            </div>
            <div style="margin-bottom: 24px;">
              <p style="color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 4px;">Email</p>
              <p style="margin: 0; font-size: 16px;"><a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></p>
            </div>
            <div style="margin-bottom: 24px;">
              <p style="color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Message</p>
              <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px;">
                <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; margin-top: 24px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">
                Sent at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Contact email sent for: ${name} <${email}>`);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    return false;
  }
};

export default { sendContactEmail };
