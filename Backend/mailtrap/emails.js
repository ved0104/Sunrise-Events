import { transporter } from "./mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await transporter.sendMail({
      from: '"Sunrise Event 👻" <allinoneatharv07@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Verify your Email ✔", // Subject line
      text: "Verify your Email", // plain text body
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ), // html body
    });
    console.log("email verification code sent succesfully", response);
  } catch (error) {
    console.log(`Error sending verification`, error.message);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendAdminVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await transporter.sendMail({
      from: '"Sunrise Event 👻" <allinoneatharv07@gmail.com>', // sender address
      to: "atharvgupta6027@gmail.com", // list of receivers
      subject: "Verify your Email ✔", // Subject line
      text: "Verify your Email", // plain text body
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ), // html body
    });
    console.log("email verification code sent succesfully", response);
  } catch (error) {
    console.log(`Error sending verification`, error.message);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: '"Sunrise Event 👻" <allinoneatharv07@gmail.com>"',
      to: email,
      template_uuid: "37e8ce20-5200-4a7a-b6fe-a534d48afc68",
      template_variables: {
        name: name,
        company_info_name: "Sunrise Events",
      },
    });
    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    console.log(`Error sending verification`, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendForgotPasswordEmail = async (email, resetURL) => {
  try {
    const response = await transporter.sendMail({
      from: '"Sunrise Event 👻" <allinoneatharv07@gmail.com>"',
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.log(`Error sending password reset email`, error);
    throw new Error("Error sending password reset email", error);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: '"Sunrise Event 👻" <allinoneatharv07@gmail.com>"',
      to: email,
      subject: "Password Reset Successfull",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("password reset email sent sucessfully", response);
  } catch (error) {
    console.log(`Error sending password reset success email`, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};
