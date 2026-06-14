export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function submitContactForm(data: ContactFormData): Promise<void> {
  const formUrl = import.meta.env.VITE_CONTACT_FORM_URL;

  if (!formUrl) {
    return Promise.reject(new Error('Contact form URL is not configured.'));
  }

  // Hidden form POST is the most reliable way to reach Google Apps Script.
  // fetch() hits redirect/CORS quirks and can show success without writing rows.
  return new Promise((resolve, reject) => {
    let settled = false;

    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      cleanup();
      ok ? resolve() : reject(new Error('Failed to submit contact form.'));
    };

    const iframeName = `contact-target-${Date.now()}`;
    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    Object.assign(iframe.style, {
      display: 'none',
      width: '0',
      height: '0',
      border: '0',
      visibility: 'hidden',
    });

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = formUrl;
    form.target = iframeName;
    form.acceptCharset = 'UTF-8';
    Object.assign(form.style, { display: 'none' });

    const fields = {
      name: data.name,
      email: data.email,
      message: data.message,
      submittedAt: new Date().toISOString(),
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    const cleanup = () => {
      form.remove();
      iframe.remove();
    };

    iframe.onload = () => finish(true);
    iframe.onerror = () => finish(false);

    document.body.appendChild(iframe);
    document.body.appendChild(form);
    form.submit();

    // Cross-origin iframe load events are unreliable; allow time for GAS to append the row.
    window.setTimeout(() => finish(true), 2500);
  });
}
