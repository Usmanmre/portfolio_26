export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const formUrl = import.meta.env.VITE_CONTACT_FORM_URL;

  if (!formUrl) {
    throw new Error('Contact form URL is not configured.');
  }

  // text/plain avoids a CORS preflight; Google Apps Script can't handle OPTIONS
  const payload = JSON.stringify({
    ...data,
    submittedAt: new Date().toISOString(),
  });

  const response = await fetch(formUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: payload,
  });

  if (!response.ok) {
    throw new Error('Failed to submit contact form.');
  }
}
