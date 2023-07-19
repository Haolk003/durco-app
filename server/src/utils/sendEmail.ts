import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import createError from "./createError";
const myOauth2Client = new OAuth2Client(
  `${process.env.GOOGLE_MAILER_CLIENT_ID}`,
  `${process.env.GOOLE_MAILTER_CLIENT_SECRET}`
);
myOauth2Client.setCredentials({
  refresh_token: `${process.env.GOOGLE_MAILER_REFRESH_TOKEN}`,
});
interface emailPropsType {
  to: string;
  subject: string;
  content: string;
}
const sendEmail = async ({ to, subject, content }: emailPropsType) => {
  if (!to || !subject || !content) {
    throw createError(400, "Please provide email subject and content");
  }
  const myAccessTokenObject = await myOauth2Client.getAccessToken();
  // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
  const myAccessToken = myAccessTokenObject?.token;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: `${process.env.AMIN_EMAIL_ADDRESS}`,
      clientId: `${process.env.GOOGLE_MAILER_CLIENT_ID}`,
      clientSecret: `${process.env.GOOLE_MAILTER_CLIENT_SECRET}`,
      refreshToken: `${process.env.GOOGLE_MAILER_REFRESH_TOKEN}`,
      accessToken: `${myAccessToken}`,
    },
  });
  const mailOptions = {
    to: to,
    subject: subject,
    html: `<h3>${content}</h3>`,
  };
  await transport.sendMail(mailOptions);
  return;
};
export default sendEmail;
