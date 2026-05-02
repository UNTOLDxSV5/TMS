export const emailService = {
  send: async (to: string, subject: string, body: string) => {
    console.log(`[EMAIL] To: ${to} Subject: ${subject}\n${body}`);
    return Promise.resolve();
  },
};
