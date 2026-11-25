// Local review server. Reads Hosting redirects; never deploys or writes to Firebase.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.mp4':'video/mp4','.ico':'image/x-icon','.woff2':'font/woff2'};
function createPreviewServer() {
  return http.createServer((request, response) => {
    const send = (code, body) => { response.writeHead(code, {'Content-Type':'text/plain; charset=utf-8'}); response.end(body); };
    if (!['GET','HEAD'].includes(request.method)) return send(405, 'Método no permitido');
    let url;
    try { url = new URL(request.url, 'http://localhost'); } catch { return send(400, 'Dirección inválida'); }
    const config = JSON.parse(fs.readFileSync(path.join(root, 'firebase.json'), 'utf8')).hosting;
    const redirect = config.redirects?.find(item => item.source === url.pathname);
    if (redirect) { response.writeHead(redirect.type, { Location:redirect.destination }); return response.end(); }
    let route;
    try { route = decodeURIComponent(url.pathname); } catch { return send(400, 'Dirección inválida'); }
    if (route.split(/[\\/]/).some(part=>part.startsWith('.')) || route.includes('\\')) return send(403, 'Acceso denegado');
    let file = path.resolve(root, '.' + route);
    if (file === root) file = path.join(root, 'index.html');
    if (!file.startsWith(root + path.sep)) return send(403, 'Acceso denegado');
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) && !path.extname(file)) file += '.html';
    let status = 200;
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { file = path.join(root, '404.html'); status = 404; }
    const stat = fs.statSync(file);
    const headers = { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Accept-Ranges':'bytes', 'Content-Length': stat.size };
    const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    let start = 0, end = stat.size - 1;
    if (range && status === 200) {
      start = Number(range[1]); end = range[2] ? Number(range[2]) : end;
      if (start > end || end >= stat.size) { response.writeHead(416, {'Content-Range':`bytes */${stat.size}`}); return response.end(); }
      status = 206; headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`; headers['Content-Length'] = end - start + 1;
    }
    response.writeHead(status, headers);
    if (request.method === 'HEAD') return response.end();
    fs.createReadStream(file, {start, end}).pipe(response);
  });
}
if (require.main === module) {
  const port = Number(process.env.PORT || 4173);
  createPreviewServer().listen(port, '127.0.0.1', () => console.log(`Vista previa local: http://127.0.0.1:${port}`));
}
module.exports = { createPreviewServer };
