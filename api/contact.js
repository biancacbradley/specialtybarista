const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Enable CORS - use specific domain in production
  const allowedOrigins = [
    'https://specialtybarista.vercel.app',
    'https://specialtybarista.com',
    'https://www.specialtybarista.com',
    'http://localhost:3000',
    'http://localhost:8000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, interest, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Configure your email transporter with explicit SMTP settings for better Vercel compatibility
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password (not regular password)
      },
    });

    // Create email subject based on selected interest
    const subject = interest ? `${interest} - Inquiry from ${name}` : `Contact Inquiry from ${name}`;
    
    // Create email body with HTML formatting
    let emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
          ${interest ? `<p style="margin: 10px 0;"><strong>Interest:</strong> ${interest}</p>` : ''}
        </div>
        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Message:</h3>
          <div style="background-color: #fff; padding: 15px; border-left: 4px solid #007cba; margin: 10px 0;">
            ${String(message).replace(/\n/g, '<br>')}
          </div>
        </div>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          This message was sent from the Specialty Barista contact form.
        </p>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'thespecialtybarista@gmail.com', // Recipient email
      subject: subject,
      html: emailBody,
      replyTo: email, // Allow replying directly to the sender
    });

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
}