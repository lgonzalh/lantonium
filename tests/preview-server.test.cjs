const test = require('node:test');
const assert = require('node:assert/strict');
const { createPreviewServer } = require('../scripts/preview.cjs');
test('local review serves clean URLs, legacy redirects, video ranges and real 404 responses', async () => {
  const server = createPreviewServer();
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    for(const page of ['','privacy','license','proyectos']) assert.equal((await fetch(url+'/'+page)).status,200);
    const old = await fetch(url+'/sevetco.html', {redirect:'manual'});
    assert.equal(old.status,301);assert.equal(old.headers.get('location'),'/?proyecto=sevetco');
    const missing = await fetch(url+'/no-existe');
    assert.equal(missing.status,404);assert.match(await missing.text(),/Esta página no está aquí/);
    assert.equal((await fetch(url+'/.firebaserc')).status,403);
    const video = await fetch(url+'/assets/mp4/svw.mp4', {headers:{Range:'bytes=0-99'}});
    assert.equal(video.status,206);assert.equal((await video.arrayBuffer()).byteLength,100);
  } finally { await new Promise(resolve=>server.close(resolve)); }
});
