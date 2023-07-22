"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const google_auth_library_1 = require("google-auth-library");
const createError_1 = __importDefault(require("./createError"));
const myOauth2Client = new google_auth_library_1.OAuth2Client(`${process.env.GOOGLE_MAILER_CLIENT_ID}`, `${process.env.GOOLE_MAILTER_CLIENT_SECRET}`);
myOauth2Client.setCredentials({
    refresh_token: `${process.env.GOOGLE_MAILER_REFRESH_TOKEN}`,
});
const sendEmail = ({ to, subject, content }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!to || !subject || !content) {
        throw (0, createError_1.default)(400, "Please provide email subject and content");
    }
    const myAccessTokenObject = yield myOauth2Client.getAccessToken();
    // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
    const myAccessToken = myAccessTokenObject === null || myAccessTokenObject === void 0 ? void 0 : myAccessTokenObject.token;
    const transport = nodemailer_1.default.createTransport({
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
    yield transport.sendMail(mailOptions);
    return;
});
exports.default = sendEmail;
