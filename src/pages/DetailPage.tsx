import React from 'react';
import { useLocation } from 'react-router-dom';
import imagen1 from '../assets/images/imagen1.png';
import imagen2 from '../assets/images/imagen2.png';
import movistar2 from '../assets/images/movistar2.png';
import Header from '../components/Header';

const maskName = (name: string): string => {
  if (!name) return '';
  return name.split(' ').map((part: string) => part.length <= 2 ? part : part.slice(0,2) + '*'.repeat(part.length-2)).join(' ');
};

const DetailPage: React.FC = () => {
  const location = useLocation();
  const { full_name, payment_reference, invoice_value } = location.state || {};
  // Aquí luego se traerán los datos de la base de datos
  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh', background: '#fff', paddingTop: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 80, marginBottom: 8, marginTop: 120, maxWidth: 600, marginLeft: 630 }}>
          <img src={movistar2} alt="Factura" style={{ maxHeight: 140, width: 'auto', objectFit: 'contain', display: 'block', marginTop: -36 }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ marginLeft: -50 }}>
              <div style={{ fontSize: 17, color: '#1a3c4e', marginBottom: 2, fontFamily: 'Georgia, Times New Roman, serif' }}>{maskName(full_name) || 'NI*** OS***'}</div>
              <div style={{ fontWeight: 400, fontSize: 18, color: '#1a3c4e', marginBottom: 12 }}>Referencia de pago {payment_reference || '6******731'}</div>
            </div>
            <div style={{ fontWeight: 400, fontSize: 17, color: '#4a5a6a', marginTop: 18 }}>Información de tu factura</div>
            <div style={{ color: '#888', fontSize: 15, marginTop: 2 }}>Factura No.BE********00</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
          <button style={{ background: '#019DF4', color: '#fff', border: 'none', borderRadius: 28, padding: '10px 18px', fontWeight: 400, fontSize: 17, boxShadow: '0 2px 8px rgba(1,157,244,0.10)', cursor: 'pointer', letterSpacing: 0.1 }}>Agregar otro número de línea u otra referencia de pago</button>
        </div>
        <div style={{ maxWidth: 900, margin: '0 auto', marginTop: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, fontSize: 20, color: '#002c3e', marginBottom: 8 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', border: '2.5px solid #019DF4', background: '#fff', marginRight: 4 }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: '#019DF4' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </span>
            Total a pagar
            <span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 22 }}>${invoice_value ? Number(invoice_value).toLocaleString() : '109,659'} <span style={{ fontSize: 16 }}>▼</span></span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ borderTop: '2px solid #002c3e', width: '85vw', maxWidth: 1200, margin: 0 }} />
          </div>
          <div style={{ display: 'flex', gap: 18, justifyContent: 'center', margin: '32px 0' }}>
            <button style={{ padding: '16px 0', width: 260, borderRadius: 28, border: '1.5px solid #002c3e', background: '#fff', color: '#002c3e', fontWeight: 600, fontSize: 20, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>Cancelar</button>
            <button style={{ padding: '16px 0', width: 260, borderRadius: 28, border: 'none', background: '#0d2c3e', color: '#fff', fontWeight: 600, fontSize: 20, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>Pagar</button>
          </div>
          <div style={{ background: '#fff', borderRadius: 8, padding: 16, textAlign: 'center', color: '#222', fontSize: 16, marginBottom: 18, border: '1px solid #e3e8ee', maxWidth: 700, margin: '0 auto 18px auto' }}>
            Envía <b>FACTURA</b> como mensaje de texto al <b>85202</b> desde tu línea móvil <b>Movistar</b> y conoce el <b>detalle de tu pago</b>.
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <img src="/src/assets/images/visa.png" alt="Visa" style={{ height: 28, margin: '0 4px', verticalAlign: 'middle' }} />
            <img src="/src/assets/images/diners.png" alt="Diners" style={{ height: 28, margin: '0 4px', verticalAlign: 'middle' }} />
            <img src="/src/assets/images/amex.png" alt="Amex" style={{ height: 28, margin: '0 4px', verticalAlign: 'middle' }} />
            <img src="/src/assets/images/pse.png" alt="PSE" style={{ height: 28, margin: '0 4px', verticalAlign: 'middle' }} />
            <img src="/src/assets/images/mastercard.png" alt="Mastercard" style={{ height: 28, margin: '0 4px', verticalAlign: 'middle' }} />
            <div style={{ fontWeight: 500, color: '#888', fontSize: 15, marginTop: 8 }}>Pagos procesados por <span style={{ color: '#2d174c', fontWeight: 700, fontStyle: 'italic' }}>ePayco</span></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage; 