const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
test('legal pages identify the author, explain privacy and preserve project-specific grants', () => {
  const privacy = fs.readFileSync(path.join(root, 'privacy.html'), 'utf8');
  const license = fs.readFileSync(path.join(root, 'license.html'), 'utf8');
  for (const html of [privacy, license]) {
    assert.match(html, /lantonium@gmail.com/);
    assert.doesNotMatch(html, /lgonzalh@outlook|googletagmanager|sitio web corporativo/);
    assert.match(html, /id="theme-toggle"/);
  }
  for(const term of ['Ley 1581','Firebase Authentication','Cloud Firestore','supresión','fuera de Colombia','no recibe tu contraseña','no utiliza Google Analytics','Google Fonts']) assert.ok(privacy.includes(term), term);
  for(const term of ['All Rights Reserved','CC BY 4.0','no revoca retroactivamente','Pixelados','terceros']) assert.ok(license.includes(term), term);
});
