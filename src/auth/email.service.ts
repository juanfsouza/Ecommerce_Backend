import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configurar o transporter com Ethereal para testes
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'roger.schiller9@ethereal.email',
        pass: 'Qs63DwKYwBJeDSknZr',
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
    const mailOptions = {
      from: 'no-reply@ecommerce.com',
      to,
      subject: 'Redefinição de Senha',
      html: `
        <p>Você solicitou a redefinição de sua senha.</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Este link expira em 1 hora.</p>
      `,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.messageId);
    return info;
  }
}