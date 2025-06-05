import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import imagen1 from '../assets/images/imagen1.png';
import imagen2 from '../assets/images/imagen2.png';
import movistar2 from '../assets/images/movistar2.png';
import movistar_pagos from '../assets/images/movistar_pagos.png';
import candadoIcon from '../assets/images/icons8-candado-24.png';
import Header from '../components/Header';
import './Detail.css';

const maskName = (name: string): string => {
  if (!name) return '';
  return name.split(' ').map((part: string) => part.length <= 2 ? part : part.slice(0,2) + '*'.repeat(part.length-2)).join(' ');
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 600);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};

const maskReference = (ref: string): string => {
  if (!ref) return '';
  if (ref.length <= 4) return '*'.repeat(ref.length);
  return ref.slice(0, 1) + '*'.repeat(ref.length - 3) + ref.slice(-2);
};

const Detail: React.FC = () => {
  const location = useLocation();
  const { full_name, payment_reference, invoice_value, invoice_pdf } = location.state || {};
  const isMobile = useIsMobile();
  // Aquí luego se traerán los datos de la base de datos

  useEffect(() => {
    // Quitar scroll de la página mientras se muestra Detail
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Función para abrir la factura PDF
  const handleConsultarFactura = () => {
    if (invoice_pdf) {
      window.open(invoice_pdf, '_blank');
    } else {
      alert('No hay factura PDF disponible para este registro.');
    }
  };

  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh', background: '#fff', paddingTop: 32 }}>
        <div className="detalle-header-superior" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 80, marginBottom: 8, marginTop: 120, maxWidth: 600, marginLeft: 630 }}>
          <img src={movistar2} alt="Factura" style={{ maxHeight: 140, width: 'auto', objectFit: 'contain', display: 'block', marginTop: -36 }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ marginLeft: -50 }}>
              <div style={{ fontSize: 17, color: '#1a3c4e', marginBottom: 2, fontFamily: 'Georgia, Times New Roman, serif' }}>{maskName(full_name) || 'NI*** OS***'}</div>
              <div style={{ fontWeight: 400, fontSize: 18, color: '#1a3c4e', marginBottom: 12 }}>Referencia de pago {maskReference(payment_reference) || '6******731'}</div>
            </div>
            {/* Solo visible en escritorio */}
            <div className="detalle-info-factura-escritorio">
              <div style={{ fontWeight: 400, fontSize: 17, color: '#4a5a6a', marginTop: 18 }}>Información de tu factura</div>
              <div style={{ color: '#888', fontSize: 15, marginTop: 2 }}>Factura No.BE********00</div>
            </div>
          </div>
        </div>
        {/* Solo visible en móvil */}
        <div className="detalle-info-factura-movil" style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 400, fontSize: 17, color: '#4a5a6a' }}>Información de tu factura</div>
          <div style={{ color: '#888', fontSize: 15, marginTop: 2 }}>Factura No.BE********00</div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '32px 0',
            marginLeft: isMobile ? 12 : undefined
          }}
        >
          <button style={{ background: '#019DF4', color: '#fff', border: 'none', borderRadius: 28, padding: '10px 18px', fontWeight: 400, fontSize: 17, boxShadow: '0 2px 8px rgba(1,157,244,0.10)', cursor: 'pointer', letterSpacing: 0.1 }}>Agregar otro número de línea u otra referencia de pago</button>
        </div>
        <div style={{ maxWidth: 900, margin: '0 auto', marginTop: 48 }}>
          <div style={{ width: '60vw', maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 600, fontSize: 20, color: '#002c3e', marginBottom: 18 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', border: '2.5px solid #019DF4', background: '#fff', marginRight: 4 }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: '#019DF4' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </span>
                Total a pagar
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>
                  ${invoice_value ? Number(invoice_value).toLocaleString() : '109,659'}
                </span>
                <span style={{ fontSize: 16 }}>▼</span>
              </span>
            </div>
            <div style={{ borderTop: '2px solid #002c3e', width: '100%', margin: 0 }} />
          </div>
          {/* Botones responsivos */}
          {isMobile ? (
            <div className="detalle-botones-movil">
              <button style={{ padding: '8px 60px', width: 180, borderRadius: 24, border: '1.5px solid #002c3e', background: '#fff', color: '#002c3e', fontWeight: 600, fontSize: 17, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>Cancelar</button>
              <button
                style={{ padding: '8px 60px', width: 180, borderRadius: 24, border: 'none', background: '#0d2c3e', color: '#fff', fontWeight: 600, fontSize: 17, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
                onClick={handleConsultarFactura}
              >
                Consultar
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 18, justifyContent: 'center', margin: '55px 0', marginTop: 32, marginBottom: 30 }}>
              <button style={{ padding: '8px 60px', width: 340, borderRadius: 28, border: '1.5px solid #002c3e', background: '#fff', color: '#002c3e', fontWeight: 600, fontSize: 22, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>Cancelar</button>
              <button
                style={{ padding: '8px 60px', width: 340, borderRadius: 28, border: 'none', background: '#0d2c3e', color: '#fff', fontWeight: 600, fontSize: 22, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
                onClick={handleConsultarFactura}
              >
                Consultar
              </button>
            </div>
          )}
          <div style={{ background: '#fff', borderRadius: 8, padding: 8, textAlign: 'left', color: '#222', fontSize: 15, marginBottom: 18, border: '1px solid #e3e8ee', width: '60vw', maxWidth: 1000, margin: '10px auto 18px auto', whiteSpace: 'nowrap' }}>
            Envía <b>FACTURA</b> como mensaje de texto al <b>85202</b> desde tu línea móvil <b>Movistar</b> y conoce el <b>detalle de tu pago</b>.
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            {isMobile ? (
              <img src={movistar_pagos} alt="Movistar Pagos" className="detalle-img-pagos-movil" />
            ) : (
              <img src={movistar_pagos} alt="Movistar Pagos" className="detalle-img-pagos-escritorio" />
            )}
            {isMobile ? (
              <div className="detalle-pagos-procesados-movil" style={{ fontWeight: 500, color: '#888', fontSize: 15, marginTop: 8, marginLeft: -24 }}>
                Pagos procesados por <img src={require('../assets/images/logo_epay.png')} alt="ePayco" className="detalle-logo-epay-movil" />
              </div>
            ) : (
              <div style={{ fontWeight: 500, color: '#888', fontSize: 15, marginTop: 8 }}>
                Pagos procesados por <img src={require('../assets/images/logo_epay.png')} alt="ePayco" className="detalle-logo-epay-movil" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail; 