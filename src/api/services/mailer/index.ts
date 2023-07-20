/* eslint-disable @typescript-eslint/no-var-requires */
import { Auth, google } from "googleapis";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
const mailgun = require("mailgun.js");

class MailService {
  mailService: Auth.OAuth2Client;
  constructor() {
    this.mailService = new google.auth.OAuth2(
      `${process.env.GOOGLE_CLIENT_ID}`,
      `${process.env.GOOGLE_CLIENT_SECRET}`,
      `https://developers.google.com/oauthplayground`
    );
  }

  async sendMailAuth(email: string, subject: string, html: string) {
    try {
      // //CREATE OAUTH2 CLIENT
      // this.mailService.setCredentials({
      //   refresh_token: `${process.env.GOOGLE_CLIENT_REFRESH_TOKEN}`,
      // });

      // //GENERATE ACCESS_TOKEN
      // const accessTokenObj = await this.mailService.getAccessToken();
      // const accessToken = accessTokenObj.token;

      // //SEND MAIL
      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     type: "OAuth2",
      //     user: `${process.env.GOOGLE_USER}`,
      //     clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      //     clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      //     refreshToken: `${process.env.GOOGLE_CLIENT_REFRESH_TOKEN}`,
      //     accessToken: accessToken,
      //   },
      //   tls: {
      //     rejectUnauthorized: false,
      //   },
      // } as SMTPTransport.Options);

      // await transporter.sendMail({
      //   from: `${process.env.GOOGLE_USER}`,
      //   to: email,
      //   subject: subject,
      //   html: html,
      // });
      const mg = mailgun({
        apiKey: process.env.MAILGUN_PRIVATE_KEY,
        domain: "sandbox590ccdfbf43a46fd95a9c4aa1f561f6e.mailgun.org",
      });

      await mg.messages.create("sandbox-123.mailgun.org", {
        from: "tai.tranminh2505@gmail.com",
        to: [email],
        subject: "Hello",
        text: "Testing some Mailgun awesomeness!",
        html: "<h1>Testing some Mailgun awesomeness!</h1>",
      });
    } catch (error) {
      throw error;
    }
  }
}
export default new MailService();
