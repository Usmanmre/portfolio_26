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

  const response = await fetch(formUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      name: data.name,
      email: data.email,
      message: data.message,
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit contact form.');
  }
}
