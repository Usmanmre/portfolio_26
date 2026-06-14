/**
 * Google Apps Script — paste into Extensions → Apps Script on your Google Sheet.
 *
 * Setup:
 * 1. Create a Google Sheet with headers in row 1:
 *    Timestamp | Name | Email | Message
 * 2. Paste this script, save, Deploy → New deployment → Web app
 * 3. Execute as: Me | Who has access: Anyone
 * 4. Copy the Web App URL into .env as VITE_CONTACT_FORM_URL
 *
 * Export to Excel anytime: File → Download → Microsoft Excel (.xlsx)
 */

function parsePayload(e) {
  if (e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }

  return {
    submittedAt: e.parameter.submittedAt,
    name: e.parameter.name,
    email: e.parameter.email,
    message: e.parameter.message,
  };
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = parsePayload(e);

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.message || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
