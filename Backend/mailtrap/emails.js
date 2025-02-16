const { transporter } = require("./mailtrap.config.js");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplates.js");

module.exports.sendVerificationEmail = async (email, verificationToken) => {
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

module.exports.sendAdminVerificationEmail = async (
  email,
  verificationToken
) => {
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

module.exports.sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: '"Sunrise Event " <allinoneatharv07@gmail.com>',
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

module.exports.sendForgotPasswordEmail = async (email, resetURL) => {
  try {
    console.log(resetURL);
    const response = await transporter.sendMail({
      from: '"Sunrise Event " <allinoneatharv07@gmail.com>"',
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });

    console.log(
      "Reset email sent to:",
      email,
      "with link:",
      resetURL,
      response
    );
  } catch (error) {
    console.log(`Error sending password reset email`, error);
    throw new Error("Error sending password reset email", error);
  }
};

module.exports.sendResetSuccessEmail = async (email) => {
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
