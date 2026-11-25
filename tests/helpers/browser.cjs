const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
exports.openSite = async () => {
  const root = path.resolve(__dirname, '../..');
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    let name = decodeURIComponent(url.pathname).replace(/^\//, '') || 'index.html';
    const config = JSON.parse(fs.readFileSync(path.join(root, 'firebase.json'), 'utf8'));
    const redirect = config.hosting.redirects?.find(item => item.source === url.pathname);
    if (redirect) { res.writeHead(redirect.type, { Location: redirect.destination }); return res.end(); }
    let file = path.resolve(root, name);
    if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
    if (!fs.existsSync(file) && !path.extname(file)) file += '.html';
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); return res.end(); }
    const type = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4','.ico':'image/x-icon'}[path.extname(file)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type }); fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const browser = await chromium.launch(process.env.CI ? { headless: true } : { channel: 'msedge', headless: true });
    return { browser, url:`http://127.0.0.1:${server.address().port}`, close: async () => { await browser.close(); await new Promise(resolve => server.close(resolve)); } };
  } catch(error) { server.close(); throw error; }
};
