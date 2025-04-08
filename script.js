async function downloadZip() {
  const JSZip = await import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm');
  const { saveAs } = await import('https://cdn.jsdelivr.net/npm/file-saver@2.0.5/+esm');
  const text = document.getElementById('inputText').value;
  const status = document.getElementById('status');
  const chars = Array.from(text).filter(c => /[\u4e00-\u9fff]/.test(c));
  const zip = new JSZip.default();
  status.textContent = '下載中...';

  await Promise.all(chars.map(async (char) => {
    const url = `https://www.twpen.com/zi/${encodeURIComponent(char)}.gif`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const blob = await res.blob();
        zip.file(`${char}.gif`, blob);
      }
    } catch (e) {
      console.error('下載失敗：', char);
    }
  }));

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'stroke_order_images.zip');
  status.textContent = '下載完成';
}
