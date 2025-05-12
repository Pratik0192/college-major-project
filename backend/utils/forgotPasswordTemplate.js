const forgotPasswordTemplate = ({ name, otp }) => {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #fefefe;">
    <h2 style="color: #e67e22; text-align: center;">🔐 Password Reset Request</h2>
    <p style="font-size: 16px;">Hi ${name},</p>
    <p style="font-size: 15px;">We received a request to reset your password. Use the OTP below to proceed:</p>

    <div style="background-color: #f1c40f; color: #000000; font-size: 24px; padding: 15px 0; margin: 20px 0; text-align: center; font-weight: bold; border-radius: 6px;">
      ${otp}
    </div>

    <p style="font-size: 14px;">This OTP is valid for <strong>1 hour</strong>. Please do not share this code with anyone.</p>

    <br />
    <p style="font-size: 15px;">If you didn’t request this, you can safely ignore this email.</p>
    <p style="font-size: 15px;">Thanks,</p>
    <p style="font-weight: bold; font-size: 16px;">OptiVerse2.0 Team</p>

    <div style="text-align: center; margin-top: 30px; color: #aaa; font-size: 13px;">
      &copy; ${new Date().getFullYear()} OptiVerse2.0. All rights reserved.
    </div>
  </div>
  `;
}

export default forgotPasswordTemplate