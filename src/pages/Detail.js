import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import styled from 'styled-components';
import Header from '../components/Header';
import movistar2 from '../assets/images/movistar2.png';
import movistar_pagos from '../assets/images/movistar_pagos.png';
import logoEpay from '../assets/images/logo_epay.png';
import { useFavicon } from '../hooks/useFavicon';
import './Detail.css';

const maskName = (name) => {
  if (!name) return '';
  return name.split(' ').map((part) => part.length <= 2 ? part : part.slice(0,2) + '*'.repeat(part.length-2)).join(' ');
};

const maskReference = (ref) => {
  if (!ref) return '';
  if (ref.length <= 4) return '*'.repeat(ref.length);
  return ref.slice(0, 1) + '*'.repeat(ref.length - 3) + ref.slice(-2);
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

const DetailContainer = styled.div`
  min-height: 100vh;
  background: #fff;
  padding-top: 32px;
`;

const Detail = () => {
  useFavicon('/imagen2.png');
  const location = useLocation();
  const [invoice, setInvoice] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    // Si no hay datos en location.state, intenta buscarlos en Supabase
    if (!invoice && (location.state?.payment_reference || location.state?.invoice_number)) {
      const fetchInvoice = async () => {
        setLoading(true);
        let data = null;
        let error = null;
        if (location.state?.payment_reference) {
          const result = await supabase
            .from('invoices')
            .select('*')
            .eq('payment_reference', location.state.payment_reference.trim())
            .single();
          data = result.data;
          error = result.error;
        } else if (location.state?.invoice_number) {
          const result = await supabase
            .from('invoices')
            .select('*')
            .eq('invoice_number', location.state.invoice_number.trim())
            .single();
          data = result.data;
          error = result.error;
        }
        if (error || !data) setError('No se encontró la factura.');
        else setInvoice(data);
        setLoading(false);
      };
      fetchInvoice();
    }
  }, [location.state, invoice]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleConsultarFactura = () => {
    if (invoice && invoice.invoice_pdf) {
      window.open(invoice.invoice_pdf, '_blank');
    } else {
      alert('No hay factura PDF disponible para este registro.');
    }
  };

  if (loading) return <div style={{textAlign: 'center', marginTop: 100}}>Cargando...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: 100 }}>{error}</div>;
  if (!invoice) return <div style={{textAlign: 'center', marginTop: 100}}>No hay datos para mostrar el detalle.</div>;

  return (
    <>
      <Header />
      <DetailContainer>
        <div className="detalle-header-superior" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 80, marginBottom: 8, marginTop: 120, maxWidth: 600, marginLeft: 630 }}>
          <img src={movistar2} alt="Factura" style={{ maxHeight: 140, width: 'auto', objectFit: 'contain', display: 'block', marginTop: -36 }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ marginLeft: -50 }}>
              <div style={{ fontSize: 17, color: '#1a3c4e', marginBottom: 2, fontFamily: 'Georgia, Times New Roman, serif' }}>{maskName(invoice.full_name) || 'NI*** OS***'}</div>
              <div style={{ fontWeight: 400, fontSize: 18, color: '#1a3c4e', marginBottom: 12 }}>Referencia de pago {maskReference(invoice.payment_reference) || '6******731'}</div>
            </div>
            {/* Solo visible en escritorio */}
            <div className="detalle-info-factura-escritorio">
              <div style={{ fontWeight: 400, fontSize: 17, color: '#4a5a6a', marginTop: 18 }}>Información de tu factura</div>
              <div style={{ color: '#888', fontSize: 15, marginTop: 2 }}>
                Factura No.BE********
                {invoice.payment_reference
                  ? invoice.payment_reference.slice(-2)
                  : ''}
              </div>
            </div>
          </div>
        </div>
        {/* Solo visible en móvil */}
        <div className="detalle-info-factura-movil" style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 400, fontSize: 17, color: '#4a5a6a' }}>Información de tu factura</div>
          <div style={{ color: '#888', fontSize: 15, marginTop: 2 }}>
            Factura No.BE********
            {invoice.payment_reference
              ? invoice.payment_reference.slice(-2)
              : ''}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
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
                  ${invoice.invoice_value ? Number(invoice.invoice_value).toLocaleString() : '109,659'}
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
                Pagos procesados por <img src={logoEpay} alt="ePayco" className="detalle-logo-epay-movil" />
              </div>
            ) : (
              <div style={{ fontWeight: 500, color: '#888', fontSize: 15, marginTop: 8 }}>
                Pagos procesados por <img src={logoEpay} alt="ePayco" className="detalle-logo-epay-movil" />
              </div>
            )}
          </div>
        </div>
      </DetailContainer>
    </>
  );
};

export default Detail; 