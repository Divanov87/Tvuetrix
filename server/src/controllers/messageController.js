const router = require('express').Router();
const Message = require('../models/Message');
const User = require('../models/User');
const { isAuth } = require('../middlewares/authMiddleware');
const nodeMailer = require('nodemailer');
const https = require('https');

router.get('/', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });

    const messages = await Message.find().populate('user', 'username').sort({ messageDate: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/no-captcha', async (req, res) => {

  const { name, email, phone, message } = req.body;

  const newMessage = new Message({
    user: req.user ? req.user._id : null,
    name,
    email,
    phone,
    message,
  });

  try {
    const savedMessage = await newMessage.save();

    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      replyTo: email,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Message from Contact Form',
      text: `User: ${req.user ? req.user._id : '-'}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'Message sent successfully', savedMessage });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, email, phone, message, recaptchaToken } = req.body;

  if (!recaptchaToken) {
    return res.status(400).json({ message: 'Recaptcha token is missing' });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

  console.log('RECAPTCHA Site Key:', process.env.RECAPTCHA_SECRET_KEY);


  https.get(verifyUrl, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', async () => {
      const result = JSON.parse(data);

      if (!result.success) {
        return res.status(400).json({ message: 'Recaptcha verification failed' });
      }

      const newMessage = new Message({
        user: req.user ? req.user._id : null,
        name,
        email,
        phone,
        message,
      });

      try {
        const savedMessage = await newMessage.save();

        const transporter = nodeMailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD,
          },
        });

        //   const transporter = nodemailer.createTransport({
        //     pool: true,
        //     port: 587,
        //     secure: false, // true (use TLS) for 465, false for other ports
        //     auth: {
        //       user: process.env.ADMIN_EMAIL,
        //       pass: process.env.ADMIN_PASSWORD,
        //     },
        //   tls: {
        //     // do not fail on invalid certs
        //     rejectUnauthorized: false,
        //   },
        // });

        const mailOptions = {
          from: process.env.ADMIN_EMAIL,
          replyTo: email,
          to: process.env.ADMIN_EMAIL,
          subject: 'New Message from Contact Form',
          text: `User: ${req.user ? req.user.username : '-'}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error sending email' });
          } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ message: 'Message sent successfully', savedMessage });
          }
        });
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    });
  }).on('error', (err) => {
    res.status(500).json({ message: 'Recaptcha verification failed' });
  });
});


router.delete('/:messageId', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });

    const deletedMessage = await Message.findByIdAndDelete(req.params.messageId);
    if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });

    res.status(200).json(deletedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
