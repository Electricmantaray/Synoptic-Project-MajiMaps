import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

// Configure email
const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

const sendContactUsEmail = async (formData) => {
    const mailOptions = {
        from: `MajiMaps Message Service <${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        subject: `MajiMaps Customer Enquiry: ${formData.reason} `,
        text: `Sender: ${formData.contactUsEmail}.\n\n========== Content ==========\n\nReason: ${formData.reason} \n\nMessage:\n${formData.message}\n\n=============================`
    };

    try {
        return await transporter.sendMail(mailOptions)
    } catch (err) {
        console.log(err);
        throw err;
    }     
};

const sendCSVEmail = async (csvData) => {
    const mailOptions = {
        from: `MajiMaps Report Export <${process.env.EMAIL}>`,
        to: "joburggenericwater@gmail.com",
        subject: "MajiMaps: All Reports CSV Export",
        text: "Attached is the latest report data exported from the admin dashboard.",
        attachments: [
            {
                filename: "maji-reports.csv",
                content: csvData,
                contentType: "text/csv"
            }
        ]
    };

    try {
        return await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error("Failed to send CSV email:", err);
        throw err;
    }
};

const sendEmailsToSubscribers = async (subscribers) => {
    try {
        const sendPromises = [];

        for (const user of subscribers) {
            const name = user.first_name || "there";
            const unsubscribeLink = `https://hayden-jones.dev/unsubscribe?email=${encodeURIComponent(user.email)}`;

            let emailBody = `Hi ${name},\n\n`;
            if (user.emailnewsletter) {
                emailBody += `Thanks for subscribing to the MajiMaps Newsletter!\nStay tuned for updates, tips, and news about water in your community.\n\n`;
            }
            if (user.emailemergency) {
                emailBody += `This is a placeholder emergency alert from MajiMaps.\nPlease stay alert and follow safety guidelines.\n\n`;
            }
            emailBody += `- The MajiMaps Team`;

            sendPromises.push(
                transporter.sendMail({
                    from: `MajiMaps Notifications <${process.env.EMAIL}>`,
                    to: user.email,
                    subject: "MajiMaps Notifications",
                    text: emailBody,
                    headers: {
                        'List-Unsubscribe': `<mailto:${process.env.EMAIL}>, <${unsubscribeLink}>`
                    }
                })
            );
        }

        await Promise.all(sendPromises);

        return {
            totalSent: sendPromises.length,
            totalRecipients: subscribers.length
        };

    } catch (err) {
        console.error("Failed to send subscriber emails:", err);
        throw err;
    }
};


export { sendContactUsEmail, sendCSVEmail, sendEmailsToSubscribers };
    
