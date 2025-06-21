const QRCode = require('qrcode');

const urls = [
  { url: 'https://www.epaypago.com/movistar.recaudo', file: 'public/qr/movistar-recaudo-qr.png' },
  { url: 'https://www.epaypago.com/edeq', file: 'public/qr/edeq-recaudo-qr.png' },
  { url: 'https://www.epaypago.com/epa', file: 'public/qr/epa-recaudo-qr.png' }
];

urls.forEach(({ url, file }) => {
  QRCode.toFile(file, url, function (err) {
    if (err) throw err;
    console.log(`¡QR generado como ${file}!`);
  });
}); 