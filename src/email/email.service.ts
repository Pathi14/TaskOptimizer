import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, 
        auth: {
            user: 'Lessie Legros', 
            pass: 'eZCfttMaTtQJkFGNE7', 
        },
        });
    }

    async sendEmail(to: string, subject: string, text: string, html?: string) {
        const mailOptions = {
        from: '"TaskOptimizer" <noreply@taskoptimizer.com>', // Adresse de l'expéditeur
        to,
        subject,
        text,
        html,
        };

        const info = await this.transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}
