const { transporter } = require("./mailtrap.config.js");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  BOOKING_STATUS_UPDATE_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} = require("./emailTemplates.js");

module.exports.sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await transporter.sendMail({
      from: '"Sunrise Event " <allinoneatharv07@gmail.com>', // sender address
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
    const emailHtml = WELCOME_EMAIL_TEMPLATE.replace("{name}", name);
    const response = await transporter.sendMail({
      from: '"Sunrise Event " <allinoneatharv07@gmail.com>',
      to: email,
      subject: "Welcome to Sunrise Events!",
      text: "Welcome to Sunrise Events!",
      html: WELCOME_EMAIL_TEMPLATE,
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

module.exports.sendBookingStatusEmail = async (email, booking) => {
  try {
    // Extract values from the booking document
    const bookingId = booking._id;
    // Assuming the booking document has an eventType field; adjust if necessary.
    const newStatus = booking.status;

    // Create the email HTML by replacing the template placeholders

    // Send the email using NodeMailer
    const response = await transporter.sendMail({
      from: '"Sunrise Events" <allinoneatharv07@gmail.com>', // Replace with your sender email
      to: email, // Recipient's email address
      subject: "Your Booking Status Has Been Updated",
      text: "Welcome to Sunrise Events!",
      html: BOOKING_STATUS_UPDATE_TEMPLATE.replace(
        "{bookingId}",
        bookingId
      ).replace("{newStatus}", newStatus),
      category: "Booking Status Update",
    });

    console.log("Booking status email sent successfully", response);
  } catch (error) {
    console.log("Error sending booking status email:", error.message);
    throw new Error(`Error sending booking status email: ${error}`);
  }
};
