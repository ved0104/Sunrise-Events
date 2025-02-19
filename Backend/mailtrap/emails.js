const { transporter } = require("./mailtrap.config.js");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  BOOKING_STATUS_UPDATE_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  BOOKING_CONFIRMATION_TEMPLATE,
  CUSTOM_BOOKING_ADMIN_NOTIFICATION_TEMPLATE,
  CONTACT_FORM_TEMPLATE,
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
      from: '"Sunrise Event " <allinoneatharv07@gmail.com>"',
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

module.exports.sendBookingConfirmationEmail = async (email, booking) => {
  try {
    // Extract values from the booking document
    console.log(booking);
    const bookingId = booking._id;
    const serviceTitle = booking.service?.title || "Custom Service";
    console.log(bookingId, "   ", booking.service, " ", email)
      ? booking.service.title // If service exists, use its title
      : "Custom Service"; // If no service, assume it's custom
    const eventDate = booking.date;
    const userName = booking.user?.name || "Valued Customer"; // Handle if user's name is undefined

    let emailHtml = BOOKING_CONFIRMATION_TEMPLATE.replace(
      "{userName}",
      userName
    )
      .replace("{bookingId}", bookingId)
      .replace("{serviceTitle}", serviceTitle)
      .replace("{eventDate}", eventDate);

    // If the service is custom, we want to include the custom service details in the email
    if (!booking.service) {
      const { eventType, description } = booking.customServiceDetails || {};
      emailHtml += `
        <p><strong>Event Type:</strong> ${eventType || "N/A"}</p>
        <p><strong>Description:</strong> ${
          description || "No description provided"
        }</p>
      `;
    }

    // Send the email using NodeMailer
    const response = await transporter.sendMail({
      from: '"Sunrise Events" <allinoneatharv07@gmail.com>', // Replace with your sender email
      to: email, // Recipient's email address
      subject: "Booking Confirmation - Sunrise Events",
      text: "Thank you for booking with Sunrise Events!",
      html: emailHtml,
      category: "Booking Confirmation",
    });

    console.log("Booking confirmation email sent successfully", response);
  } catch (error) {
    console.log("Error sending booking confirmation email:", error.message);
    throw new Error(`Error sending booking confirmation email: ${error}`);
  }
};

module.exports.sendCustomBookingAdminEmail = async (booking) => {
  try {
    const user = booking.user;
    const { eventType, description } = booking.customServiceDetails;

    const emailHtml = CUSTOM_BOOKING_ADMIN_NOTIFICATION_TEMPLATE({
      userName: user.name || "Unknown User",
      userEmail: user.email || "No Email Provided",
      userPhone: user.phonenumber || "No Phone Provided",
      bookingId: booking._id.toString(),
      eventType: eventType || "N/A",
      description: description || "No description provided",
      eventDate: booking.date.toDateString(),
      createdAt: booking.createdAt,
    });

    const response = await transporter.sendMail({
      from: '"Sunrise Events" <allinoneatharv07@gmail.com>', // Your email
      to: "allinoneatharv07@gmail.com", // Admin email
      subject: "New Custom Booking Request - Sunrise Events",
      html: emailHtml,
    });

    console.log(
      "Custom booking admin notification email sent:",
      response.messageId
    );
  } catch (error) {
    console.error("Error sending custom booking admin email:", error.message);
    throw new Error(
      `Failed to send custom booking admin email: ${error.message}`
    );
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

    console.log("Booking status email sent successfully");
  } catch (error) {
    console.log("Error sending booking status email:", error.message);
    throw new Error(`Error sending booking status email: ${error}`);
  }
};

// Function to send Contact Form email
module.exports.sendContactEmail = async (formData) => {
  try {
    const { name, email, phone, services, message } = formData;

    const emailHtml = CONTACT_FORM_TEMPLATE({
      name,
      email,
      phone,
      services,
      message,
    });

    // Send email
    await transporter.sendMail({
      from: '"Sunrise Event " <allinoneatharv07@gmail.com>"', // Sender
      to: "allinoneatharv07@gmail.com", // Admin Email
      subject: "New Contact Form Submission - Sunrise Events",
      html: emailHtml,
    });

    console.log("Contact form email sent successfully");
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending contact form email:", error);
    return { success: false, message: "Error sending email" };
  }
};
