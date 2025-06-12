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


export { sendContactUsEmail, sendCSVEmail };
    
