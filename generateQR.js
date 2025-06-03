const QRCode = require('qrcode');

const url = 'https://www.epaypago.com/movistar.recaudo';

QRCode.toFile('movistar-recaudo-qr.png', url, function (err) {
  if (err) throw err;
  console.log('¡QR generado como movistar-recaudo-qr.png!');
}); 