interface MagicLinkEmailProps {
  url: string;
}

const MagicLinkEmail = ({ url }: MagicLinkEmailProps) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Continue to InsightFlow</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
          <td align="center" bgcolor="#8B5CF6" style="padding: 40px 0;">
            <table border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
                    border-radius: 50%;
                    margin-right: 10px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">
                    <span style="color: white; font-size: 24px; font-weight: bold;">I</span>
                  </div>
                </td>
                <td>
                  <h1 style="margin: 0; font-size: 24px; color: #ffffff;">InsightFlow</h1>
                  <p style="margin: 0; font-size: 14px; color: #E9D5FF;">Product Feedback Made Simple</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <h2 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Continue to InsightFlow</h2>
            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              Thank you for using InsightFlow! Click the button below to continue. This secure link will expire in 24 hours for your protection.
            </p>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center">
                  <a href="${url}" style="display: inline-block; background-color: #8B5CF6; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; padding: 12px 30px; border-radius: 5px;">Continue to InsightFlow</a>
                </td>
              </tr>
            </table>
            <p style="color: #666666; font-size: 14px; line-height: 1.5; margin-top: 30px;">
              If you didn't request this email, you can safely ignore it.
            </p>
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#f8f8f8" style="padding: 20px 0;">
            <p style="color: #999999; font-size: 12px; margin: 0;">&copy; 2024 InsightFlow. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
   `;
export default MagicLinkEmail;
