import React, { useState, useEffect } from 'react';
import logoEdeq from '../assets/images/logo_edeq.png';
import logo2Edeq from '../assets/images/logo2_edeq.png';
import logoPse from '../assets/images/logo_pse.png';
import logoDaviplata from '../assets/images/logo_daviplata.png';
import logoEpay from '../assets/images/logo_epay.png';
import styled from 'styled-components';

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
    width: 90vw;
    max-width: 270px;
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
    font-size: 16px;
    width: 200px;
    padding: 8px 0;
  }
`;

const PolicyText = styled.span`
  font-size: 15px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const EdeqPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'factura' | 'somos'>('factura');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: 0, overflowX: 'hidden', width: '100vw', maxWidth: '100vw' }}>
      <img
        src={logoEdeq}
        alt="EDEQ"
        style={{
          width: '100vw',
          maxWidth: '100vw',
          display: 'block',
          margin: 0,
          padding: 0,
          height: 'auto',
        }}
        className="edeq-header-img"
      />
      <img
        src={logo2Edeq}
        alt="EDEQ Central"
        style={{ margin: '40px auto 0 auto', display: 'block', maxWidth: 260, width: '100%', height: 'auto' }}
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
          <img src="https://epayco-sftp-clients.s3.amazonaws.com/edeq/img/page.svg" alt="phone icon" style={{ height: 24, marginRight: 18, display: 'inline-block', verticalAlign: 'middle' }} />
          <StyledInput
            type="text"
            placeholder="Ingresa tu código NIU."
          />
        </InputContainer>
      </InputWrapper>

      {/* Botón pagar y texto ePayco */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '18px 0 8px 0' }}>
        <button
          style={{
            width: '40%',
            minWidth: 120,
            maxWidth: 220,
            background: '#eaeaea',
            color: '#fff',
            fontWeight: 700,
            fontSize: 20,
            border: 'none',
            borderRadius: 32,
            padding: '1px 32px',
            cursor: 'not-allowed',
            opacity: 1,
            display: 'block',
          }}
          disabled
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
            Acepto la{' '}
            <a href="#" style={{ color: '#3fa9f5', textDecoration: 'underline', fontWeight: 500, fontSize: 13 }}>
              política de tratamiento de datos personales
            </a>{' '}
            de EDEQ.
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
          @media (max-width: 600px) {
            .edeq-header-img {
              height: 55px !important;
              object-fit: cover;
            }
            .edeq-logo2-img {
              margin-top: 0 !important;
              margin-bottom: 80px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default EdeqPage; 