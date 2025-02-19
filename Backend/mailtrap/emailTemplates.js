module.exports.VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

module.exports.PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

module.exports.PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

module.exports.BOOKING_STATUS_UPDATE_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Status Update</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <!-- Header -->
  <div style="background: linear-gradient(to right, #FF7E5F, #feb47b); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Booking Status Update</h1>
  </div>
  
  <!-- Main Content -->
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We are writing to inform you that the status of your booking has been updated. Please find the details below:</p>
    
    <p><strong>Booking ID:</strong> {bookingId}</p>
    <p><strong>New Status:</strong> {newStatus}</p>
    
    <p>If you have any questions or require further assistance, please do not hesitate to contact us at <a href="mailto:support@sunriseevents.com" style="color: #FF7E5F;">support@sunriseevents.com</a> or call us at (123) 456-7890.</p>
    
    <p>Thank you for choosing Sunrise Events. We look forward to making your event unforgettable!</p>
    
    <p>Best regards,<br>
    The Sunrise Events Team</p>
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
    <p>&copy; ${new Date().getFullYear()} Sunrise Events. All rights reserved.</p>
  </div>
</body>
</html>
`;

module.exports.BOOKING_CONFIRMATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <!-- Header -->
  <div style="background: linear-gradient(to right, #FF7E5F, #feb47b); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Booking Confirmation</h1>
  </div>
  
  <!-- Main Content -->
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {userName},</p>
    <p>Thank you for booking with Sunrise Events! We are excited to help make your event a success. Below are the details of your booking:</p>
    
    <p><strong>Booking ID:</strong> {bookingId}</p>
    <p><strong>Service:</strong> {serviceTitle}</p>
    <p><strong>Event Date:</strong> {eventDate}</p>
    <p><strong>Status:</strong> Pending</p>
    
    <p>If you need to make any changes or have any questions, feel free to contact us at <a href="mailto:support@sunriseevents.com" style="color: #FF7E5F;">support@sunriseevents.com</a> or call us at (123) 456-7890.</p>
    
    <p>We look forward to working with you to make your event unforgettable!</p>
    
    <p>Best regards,<br>
    The Sunrise Events Team</p>
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
    <p>&copy; ${new Date().getFullYear()} Sunrise Events. All rights reserved.</p>
  </div>
</body>
</html>
`;

module.exports.WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Sunrise Events</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <!-- Header -->
  <div style="background: linear-gradient(to right, #FF7E5F, #feb47b); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to Sunrise Events</h1>
  </div>
  
  <!-- Main Content -->
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {name},</p>
    <p>We're thrilled to have you on board! Thank you for joining the Sunrise Events family—where unforgettable experiences begin.</p>
    <p>At Sunrise Events, we specialize in creating magical moments for every occasion, from weddings, receptions, sangeet, and haldi celebrations to bespoke events designed just for you.</p>
    <p>Explore our range of services, check out our gallery for inspiration, and feel free to reach out if you have any questions or need assistance planning your event.</p>
    <p>Once again, welcome to Sunrise Events! We look forward to making your events extraordinary.</p>
    <p>Best regards,<br>
    The Sunrise Events Team</p>
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>&copy; ${new Date().getFullYear()} Sunrise Events. All rights reserved.</p>
  </div>
</body>
</html>
`;

module.exports.CUSTOM_BOOKING_ADMIN_NOTIFICATION_TEMPLATE = ({
  userName,
  userEmail,
  userPhone,
  bookingId,
  eventType,
  description,
  eventDate,
  createdAt,
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Custom Booking Request</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    "
  >
    <!-- Header -->
    <div
      style="
        background: linear-gradient(to right, #ff7e5f, #feb47b);
        padding: 20px;
        text-align: center;
        color: white;
      "
    >
      <h1>New Custom Booking Request</h1>
    </div>

    <!-- Main Content -->
    <div
      style="
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      "
    >
      <p>Dear Admin,</p>
      <p>
        A new custom event booking request has been submitted. Here are the
        details:
      </p>

      <p><strong>Booking ID:</strong> ${bookingId}</p>
      <p><strong>Submitted On:</strong> ${new Date(
        createdAt
      ).toLocaleString()}</p>

      <h3>User Contact Details:</h3>
      <p><strong>Name:</strong> ${userName}</p>
      <p><strong>Email:</strong> ${userEmail}</p>
      <p><strong>Phone:</strong> ${userPhone || "N/A"}</p>

      <h3>Event Details:</h3>
      <p><strong>Event Type:</strong> ${eventType}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Event Date:</strong> ${new Date(eventDate).toDateString()}</p>

      <p>Please review this booking and take the necessary actions.</p>

      <p>Best regards,<br />Sunrise Events System</p>
    </div>

    <!-- Footer -->
    <div
      style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em"
    >
      <p>This is an automated message. Please do not reply to this email.</p>
      <p>&copy; ${new Date().getFullYear()} Sunrise Events. All rights reserved.</p>
    </div>
  </body>
</html>
`;

module.exports.CONTACT_FORM_TEMPLATE = ({
  name,
  email,
  phone,
  services,
  message,
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Form Submission - Sunrise Events</title>
  </head>
  <body
    style="
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    "
  >
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
      <!-- Header -->
      <div style="background-color: #ec4899; color: #ffffff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="margin: 5px 0; font-size: 14px;">Sunrise Events Inquiry</p>
      </div>

      <!-- Body -->
      <div style="padding: 20px; line-height: 1.6; color: #333;">
        <p>Dear Admin,</p>
        <p>You have received a new inquiry from the contact form on the Sunrise Events website. Here are the details:</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="padding: 8px; background-color: #f9f9f9; font-weight: bold;">Full Name:</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #f9f9f9; font-weight: bold;">Email Address:</td>
            <td style="padding: 8px;"><a href="mailto:${email}" style="color: #ec4899; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #f9f9f9; font-weight: bold;">Phone Number:</td>
            <td style="padding: 8px;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #f9f9f9; font-weight: bold;">Interested Service:</td>
            <td style="padding: 8px;">${services}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background-color: #f9f9f9; font-weight: bold;">Message:</td>
            <td style="padding: 8px;">${message}</td>
          </tr>
        </table>

        <p style="margin-top: 20px;">Please reach out to the client as soon as possible.</p>

        <p>Best Regards,<br /><strong>Sunrise Events Website</strong></p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f4f4f4; text-align: center; padding: 10px 0; color: #777; font-size: 12px;">
        <p>This is an automated message from Sunrise Events. Please do not reply to this email.</p>
        <p>&copy; ${new Date().getFullYear()} Sunrise Events. All Rights Reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
