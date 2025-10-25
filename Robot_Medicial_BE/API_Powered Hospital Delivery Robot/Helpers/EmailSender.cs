using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;

namespace API_Powered_Hospital_Delivery_Robot.Helpers
{
    public class EmailSender 
    {
        private readonly IConfiguration _configuration;

        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendAccountActivateEmail(string email, string fullName, string username)
        {
            var subject = "Tài khoản đã được kích hoạt lại - Hospital Delivery Robot";
            var htmlBody = EmailTemplate.GetAccountActivateEmail(fullName, username);
            await SendEmailAsync(email, subject, htmlBody);
        }

        public async Task SendAccountDeactivateEmail(string email, string fullName, string username)
        {
            var subject = "Tài khoản đã bị tạm khóa - Hospital Delivery Robot";
            var htmlBody = EmailTemplate.GetAccountDeactivateEmail(fullName, username);
            await SendEmailAsync(email, subject, htmlBody);
        }

        private async Task SendEmailAsync(string email, string subject, string htmlBody)
        {
            var smtpSettings = _configuration.GetSection("EmailSettings");
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(smtpSettings["SenderName"], smtpSettings["SenderEmail"]));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = htmlBody
            };
            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            try
            {
                await client.ConnectAsync(smtpSettings["SmtpServer"], 587, MailKit.Security.SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(smtpSettings["SenderEmail"], smtpSettings["Password"]);
                await client.SendAsync(message);
            }
            finally
            {
                await client.DisconnectAsync(true);
            }
        }
    }

    public static class EmailTemplate
    {
        private static string GetBaseTemplate(string title, string content, string buttonHtml = "")
        {
            return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset=""utf-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
    <title>{title} - Hospital Delivery Robot</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }}
        .container {{
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }}
        .header {{
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }}
        .header h1 {{
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 600;
        }}
        .header p {{
            font-size: 16px;
            opacity: 0.9;
        }}
        .robot-icon {{
            font-size: 48px;
            margin-bottom: 15px;
        }}
        .content {{
            padding: 40px 30px;
            text-align: center;
        }}
        .message {{
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
            line-height: 1.8;
            text-align: left;
        }}
        .button {{
            display: inline-block;
            background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
            color: white;
            padding: 15px 35px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        }}
        .button:hover {{
            background: linear-gradient(135deg, #1e7e34 0%, #28a745 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
        }}
        .info-box {{
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 10px;
            padding: 20px;
            margin: 30px 0;
            text-align: left;
        }}
        .info-box h3 {{
            color: #007bff;
            margin-bottom: 15px;
            font-size: 18px;
        }}
        .info-box p {{
            margin-bottom: 10px;
            color: #555;
        }}
        .warning-box {{
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 10px;
            padding: 20px;
            margin: 30px 0;
            color: #856404;
            text-align: left;
        }}
        .success-box {{
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 10px;
            padding: 20px;
            margin: 30px 0;
            color: #155724;
            text-align: robot;
        }}
        .danger-box {{
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 10px;
            padding: 20px;
            margin: 30px 0;
            color: #721c24;
            text-align: left;
        }}
        .footer {{
            background-color: #007bff;
            color: white;
            padding: 30px 20px;
            text-align: center;
        }}
        .footer p {{
            margin-bottom: 10px;
        }}
        .contact-info {{
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #0056b3;
        }}
        .contact-info p {{
            font-size: 14px;
            margin: 5px 0;
        }}
        .divider {{
            height: 1px;
            background: linear-gradient(to right, transparent, #ddd, transparent);
            margin: 30px 0;
        }}
        @media only screen and (max-width: 600px) {{
            .container {{
                margin: 0;
                border-radius: 0;
            }}
            .content {{
                padding: 30px 20px;
            }}
            .header h1 {{
                font-size: 24px;
            }}
            .message {{
                font-size: 14px;
            }}
            .button {{
                padding: 15px 25px;
                font-size: 14px;
            }}
        }}
    </style>
</head>
<body>
    <div class=""container"">
        <div class=""header"">
            <div class=""robot-icon"">🤖</div>
            <h1>Hospital Delivery Robot</h1>
            <p>{title}</p>
        </div>
        
        <div class=""content"">
            {content}
            {buttonHtml}
            <div class=""divider""></div>
        </div>

        <div class=""footer"">
            <p><strong>Hospital Delivery Robot</strong> - Hệ thống robot giao hàng bệnh viện</p>
            <div class=""contact-info"">
                <p>📧 Email hỗ trợ: support@hospitaldelivery.com</p>
                <p>📞 Hotline: 1900-ROBOT (76268)</p>
                <p>🕐 Thời gian hỗ trợ: 24/7</p>
            </div>
            <p style=""margin-top: 20px; font-size: 12px; opacity: 0.8;"">
                © 2025 Hospital Delivery Robot. Tất cả quyền được bảo lưu.
            </p>
        </div>
    </div>
</body>
</html>";
        }
        public static string GetAccountActivateEmail(string fullName, string username)
        {
            var content = $@"
                <div class=""message"">
                    <h2 style=""color: #28a745; margin-bottom: 20px; text-align: center;"">Xin chào {fullName}!</h2>
                    <p style=""text-align: center;"">Chúng tôi vui mừng thông báo rằng tài khoản của bạn đã được <strong>kích hoạt lại</strong> thành công!</p>
                </div>

                <div class=""success-box"">
                    <h3>🎉 Tài khoản đã được kích hoạt</h3>
                    <p>• Tài khoản <strong>{username}</strong> đã được mở trở lại</p>
                    <p>• Bạn có thể đăng nhập và sử dụng tất cả tính năng</p>
                    <p>• Thời gian kích hoạt: {DateTime.Now:dd/MM/yyyy HH:mm}</p>
                    <p>• Tất cả dữ liệu trước đó đã được khôi phục</p>
                </div>

                <div class=""info-box"">
                    <h3>🔐 Bảo mật tài khoản</h3>
                    <p>Để đảm bảo tài khoản an toàn:</p>
                    <p>• Đăng nhập và kiểm tra lại thông tin cá nhân</p>
                    <p>• Đổi mật khẩu nếu cần thiết</p>
                    <p>• Xem lại các hoạt động gần đây</p>
                    <p>• Cập nhật thông tin liên lạc</p>
                </div>

                <div class=""warning-box"">
                    <h3>⚡ Lưu ý quan trọng</h3>
                    <p>• Vui lòng tuân thủ các điều khoản sử dụng để tránh bị khóa lại</p>
                    <p>• Báo cáo ngay nếu phát hiện hoạt động bất thường</p>
                    <p>• Liên hệ hỗ trợ nếu gặp bất kỳ vấn đề nào</p>
                </div>";

            var loginUrl = $"https://localhost:5001/api/auth/login"; // Thay bằng URL thực tế
            var buttonHtml = $@"<a href=""{loginUrl}"" class=""button"">🚀 Đăng nhập ngay</a>";

            return GetBaseTemplate("Tài khoản đã được kích hoạt lại", content, buttonHtml);
        }

        public static string GetAccountDeactivateEmail(string fullName, string username)
        {
            var content = $@"
                <div class=""message"">
                    <h2 style=""color: #dc3545; margin-bottom: 20px; text-align: center;"">Xin chào {fullName}</h2>
                    <p style=""text-align: center;"">Tài khoản của bạn tại <strong>Hospital Delivery Robot</strong> đã bị tạm khóa.</p>
                </div>

                <div class=""warning-box"">
                    <h3>⚠️ Tài khoản bị tạm khóa</h3>
                    <p>• Tài khoản <strong>{username}</strong> hiện đang ở trạng thái <strong>bị khóa tạm thời</strong></p>
                    <p>• Bạn không thể đăng nhập vào hệ thống cho đến khi tài khoản được kích hoạt lại</p>
                    <p>• Thời gian khóa: {DateTime.Now:dd/MM/yyyy HH:mm}</p>
                    <p>• Tất cả dữ liệu của bạn vẫn được bảo lưu</p>
                </div>

                <div class=""info-box"">
                    <h3>🛡️ Lý do khóa tài khoản</h3>
                    <p>Tài khoản có thể bị khóa do các lý do sau:</p>
                    <p>• Vi phạm điều khoản sử dụng</p>
                    <p>• Hoạt động bất thường được phát hiện</p>
                    <p>• Yêu cầu từ quản trị viên</p>
                    <p>• Mục đích bảo mật tài khoản</p>
                </div>

                <div class=""success-box"">
                    <h3>📞 Khiếu nại và hỗ trợ</h3>
                    <p>Nếu bạn có bất kỳ thắc mắc nào về việc khóa tài khoản:</p>
                    <p>• <strong>Email hỗ trợ:</strong> support@hospitaldelivery.com</p>
                    <p>• <strong>Hotline:</strong> 1900-ROBOT (76268)</p>
                    <p>• <strong>Thời gian hỗ trợ:</strong> 24/7</p>
                    <p><strong>Lưu ý:</strong> Nếu khiếu nại thành công, tài khoản sẽ được mở trở lại và bạn sẽ nhận được email thông báo.</p>
                </div>";

            return GetBaseTemplate("Tài khoản bị tạm khóa", content);
        }
    }
}
