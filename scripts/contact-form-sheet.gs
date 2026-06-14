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
  if (e.parameter && (e.parameter.name || e.parameter.email || e.parameter.message)) {
    return {
      submittedAt: e.parameter.submittedAt,
      name: e.parameter.name,
      email: e.parameter.email,
      message: e.parameter.message,
    };
  }

  if (e.postData && e.postData.contents) {
    var type = (e.postData.type || '').toLowerCase();

    if (type.indexOf('application/json') !== -1) {
      return JSON.parse(e.postData.contents);
    }

    var params = {};
    e.postData.contents.split('&').forEach(function (pair) {
      var parts = pair.split('=');
      var key = decodeURIComponent((parts[0] || '').replace(/\+/g, ' '));
      var value = decodeURIComponent((parts[1] || '').replace(/\+/g, ' '));
      params[key] = value;
    });

    return {
      submittedAt: params.submittedAt,
      name: params.name,
      email: params.email,
      message: params.message,
    };
  }

  return {
    submittedAt: '',
    name: '',
    email: '',
    message: '',
  };
}

function appendSubmission(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = parsePayload(e);

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.message || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    return appendSubmission(e);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    return appendSubmission(e);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
