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
      //CREATE OAUTH2 CLIENT
      this.mailService.setCredentials({
        refresh_token: `${process.env.GOOGLE_CLIENT_REFRESH_TOKEN}`,
      });

      //GENERATE ACCESS_TOKEN
      const accessTokenObj = await this.mailService.getAccessToken();
      const accessToken = accessTokenObj.token;

      //SEND MAIL
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: `${process.env.GOOGLE_USER}`,
          clientId: `${process.env.GOOGLE_CLIENT_ID}`,
          clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
          refreshToken: `${process.env.GOOGLE_CLIENT_REFRESH_TOKEN}`,
          accessToken: accessToken,
        },
        tls: {
          rejectUnauthorized: false,
        },
      } as SMTPTransport.Options);

      await transporter.sendMail({
        from: `${process.env.GOOGLE_USER}`,
        to: email,
        subject: subject,
        html: html,
      });
    } catch (error) {
      throw error;
    }
  }
}
export default new MailService();
