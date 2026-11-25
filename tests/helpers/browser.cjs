const { chromium } = require('playwright');
const { createPreviewServer } = require('../../scripts/preview.cjs');
exports.openSite = async () => {
  const server = createPreviewServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const browser = await chromium.launch(process.env.CI ? { headless: true } : { channel: 'msedge', headless: true });
    return { browser, url:`http://127.0.0.1:${server.address().port}`, close: async () => { await browser.close(); await new Promise(resolve => server.close(resolve)); } };
  } catch(error) { server.close(); throw error; }
};
