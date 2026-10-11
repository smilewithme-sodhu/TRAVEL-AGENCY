import nodemailer from 'nodemailer';

export const isMailConfigured = (): boolean =>
  !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

export async function sendMail(to: string, subject: string, html: string): Promise<boolean> {
  if (!isMailConfigured()) {
    console.warn('[mailer] SMTP not configured (SMTP_HOST/SMTP_USER/SMTP_PASS). Email NOT sent.');
    console.warn(`[mailer] To: ${to} | Subject: ${subject}\n${html.replace(/<[^>]+>/g, ' ')}`);
    return false;
  }
  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({
    from: process.env.MAIL_FROM || `Gumnu JUM <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
  return true;
}
