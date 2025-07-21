const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// POST endpoint to send email
app.post('/send-order-email', async (req, res) => {
    const { userEmail, orderItems } = req.body;

    const orderList = orderItems.map(
        item => `${item.title} (x${item.quantity}) - ${item.price}`
    ).join('\n');

    try {
        // Setup transporter (Gmail example)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'drivesunder606@gmail.com',
                pass: 'rsrrsvgo'  // not your Gmail password, use App Password
            }
        });

        await transporter.sendMail({
            from: 'drivesunder606@gmail.com',
            to: 'drivesunder606@gmail.com',
            subject: 'New Order Placed',
            text: `User: ${userEmail}\n\nOrder Details:\n${orderList}`
        });

        res.status(200).send({ success: true, message: "Email sent successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: "Failed to send email." });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
