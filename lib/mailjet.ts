// lib/mailjet.ts

import Mailjet from 'node-mailjet';

export async function sendEmail({
  to,
  subject,
  text,
  html,
  attachments = []
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: string[];
}) {
  try {
    const mailjet = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY!,
      process.env.MAILJET_API_SECRET!
    );

    const emailRequest = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_FROM,
            Name: 'edemics School',
          },
          To: [
            {
              Email: to,
              Name: to.split('@')[0], // Use the part before @ as name
            },
          ],
          Subject: subject,
          TextPart: text,
          HTMLPart: html,
          // Handle attachments if needed
          // Attachments: attachments.map(attachment => ({
          //   ContentType: 'application/pdf',
          //   Filename: attachment,
          //   Base64Content: 'base64-encoded-content' // You would need to encode your files
          // }))
        },
      ],
    });

    const result = await emailRequest;
    return result;
  } catch (error) {
    console.error('Error sending email with Mailjet:', error);
    throw error;
  }
}