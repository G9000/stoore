import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../libs/prisma";
import Handlebars from "handlebars";
import path from "path";
import { readFileSync } from "fs";

// Email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT as unknown as number,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: process.env.NODE_ENV === "production",
});

const emailsDir = path.resolve(process.cwd(), "emails");

const sendVerificationRequest = ({ identifier, url }: any) => {
  const emailFile = readFileSync(path.join(emailsDir, "confirm-email.html"), {
    encoding: "utf8",
  });

  console.log("url", url);

  const emailTemplate = Handlebars.compile(emailFile);
  transporter.sendMail({
    from: `"✨ Stoore" ${process.env.EMAIL_FROM}`,
    to: identifier,
    subject: "Your sign-in link for Stoore",
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier,
    }),
  });
};

const sendWelcomeEmail = async ({ user }: any) => {
  const { email } = user;

  try {
    const emailFile = readFileSync(path.join(emailsDir, "welcome.html"), {
      encoding: "utf8",
    });
    const emailTemplate = Handlebars.compile(emailFile);
    await transporter.sendMail({
      from: `"✨ Stoore" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: "Welcome to Stoore! 🎉",
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL,
        support_email: "leo.caesar@live.com",
      }),
    });
  } catch (error) {
    console.log(`❌ Unable to send welcome email to user (${email})`);
  }
};

export default NextAuth({
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
  },
  providers: [
    EmailProvider({
      maxAge: 10 * 60,
      sendVerificationRequest,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  events: { createUser: sendWelcomeEmail },
});
