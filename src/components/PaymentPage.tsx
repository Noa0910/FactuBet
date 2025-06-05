import React, { useState } from 'react';
import styled from 'styled-components';
import relojImg from '../assets/images/reloj.png';
import logoEpay from '../assets/images/logo_epay.png';
import logoRefe from '../assets/images/logo_refe.png';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import movistarPagos2 from '../assets/images/movistar_pagos2.png';
import smartphoneIcon from '../assets/images/icons8-smartphone-24.png';
import candadoIcon from '../assets/images/icons8-candado-24.png';

const TabsContainer = styled.div`
  background: white;
  padding: 3px 4px;
  border-radius: 25px;
  box-shadow: 3px 6px 6px 0 rgba(0,0,0,0.18);
  display: flex;
  gap: 4px;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const TabsGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 75px 0 25px 0;
  width: auto;
  max-width: 100%;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 11px 12px;
  border-radius: 20px;
  border: none;
  background: ${props => props.active ? '#00a0e6' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#00a0e6'};
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  font-size: 14px;
  flex: 1;

  &:hover:not(.active) {
    background: #e8e8e8;
  }
`;

const BillingTitle = styled.h2`
  color: #333;
  margin: 15px 0 10px 0;
  text-align: center;
  width: 100%;
  font-weight: 300;
  font-size: 20px;

  span {
    font-weight: bold;
    color: #333;
  }
`;

const AutoPayButton = styled.button`
  background: rgb(211, 212, 211);
  color: #fff;
  padding: 8px 24px;
  border: none;
  border-radius: 35px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin: 0 auto;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 37%;
  justify-content: center;
  line-height: 1.4;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: normal;
  letter-spacing: 0.2px;

  .icon-row {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }

  img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    margin-right: 3px;
    margin-bottom: 0;
  }

  .text-main {
    font-family: inherit;
    font-weight: inherit;
    text-align: center;
    display: inline-block;
  }

  .text-sub {
    font-family: inherit;
    font-weight: inherit;
    text-align: center;
    display: block;
    margin-left: 0;
  }

  &:hover {
    background: #bdbebd;
  }
`;

const FormTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  font-weight: normal;

  span {
    font-weight: bold;
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;
`;

const PaymentMethod = styled.button<{ active?: boolean }>`
  padding: 10px 20px;
  border: 2px solid black;
  border-radius: 25px;
  background: ${props => props.active ? 'black' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    opacity: 0.8;
  }
`;

const InputContainer = styled.div`
  width: 38%;
  margin: 0 auto 20px auto;
  background: none;
  padding: 0;
  border-radius: 0;
  box-shadow: none;

  input {
    width: 100%;
    padding: 14px 0 8px 0;
    padding-left: 28px;
    border: none;
    border-bottom: 1px solid black;
    border-radius: 0;
    font-size: 16px;
    background: none;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-bottom: 1.5px solid black;
      box-shadow: none;
    }
  }
`;

const SubmitButton = styled.button<{ enabled?: boolean }>`
  width: 38%;
  margin: 0 auto 20px auto;
  padding: 10px;
  background: ${props => props.enabled ? 'black' : 'rgb(211, 212, 211)'};
  color: ${props => props.enabled ? 'white' : 'white'};
  border: 2px solid ${props => props.enabled ? 'black' : 'rgb(211, 212, 211)'};
  border-radius: 35px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: block;
  text-align: center;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: 500;

  &:hover {
    background: ${props => props.enabled ? '#222' : '#bdbebd'};
  }

  &:disabled {
    background: rgb(211, 212, 211);
    color: white;
    border-color: rgb(211, 212, 211);
    cursor: not-allowed;
  }
`;

const HelpLink = styled.a`
  display: block;
  text-align: center;
  color: #00a0e6;
  text-decoration: none;
  margin-top: 20px;
  width: 100%;

  &:hover {
    text-decoration: underline;
  }
`;

const PromoContainer = styled.div`
  width: 38%;
  height: fit-content;
  margin-bottom: 120px;
  margin-top: 0;

  img {
    width: 100%;
    height: 80vh;
    display: block;
    object-fit: contain;
  }
`;

const MainContent = styled.div`
  display: flex;
  padding: 0;
  gap: 20px;
  overflow: visible;
`;

const PaymentSection = styled.div`
  width: 62%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0;
  margin-left: -024px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #00a0e6;
  font-weight: 400;
`;

const RadioInput = styled.input`
  display: none;

  &:checked + span {
    border: 2px solid #00a0e6;
  }
  &:checked + span::after {
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #00a0e6;
    position: absolute;
    top: 3px;
    left: 3px;
  }
`;

const CustomRadio = styled.span`
  width: 24px;
  height: 24px;
  border: 2px solid #00a0e6;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  position: relative;
  box-sizing: border-box;
  background: #fff;
`;

const Icon = styled.i`
  font-size: 18px;
  color: #00a0e6;
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const UnderlineField = styled.div`
  display: flex;
  align-items: center;
  width: 38%;
  margin: 0 auto 20px auto;
  position: relative;
  flex-direction: row;

  select, input {
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    font-size: 16px;
    padding: 14px 0 8px 0;
    padding-left: 28px;
    width: 100%;
    background: none;
    color: #333;
    appearance: none;
    box-sizing: border-box;
  }

  select:focus, input:focus {
    border-bottom: 1.5px solid black;
  }

  .dropdown-arrow {
    position: absolute;
    right: 8px;
    top: 18px;
    pointer-events: none;
    color: #002c3e;
    font-size: 14px;
  }
`;

const FooterInfo = styled.div`
  margin: 10px auto 0 auto;
  width: 100%;
  text-align: center;
  color: #002c3e;
`;

const PaycoLine = styled.div`
  font-size: 20px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #002c3e;
`;

const PaycoLogo = styled.span`
  font-family: 'Segoe UI', Arial, sans-serif;
  font-weight: bold;
  color: #2d174c;
  font-size: 24px;
  font-style: italic;
  letter-spacing: 1px;
`;

const LockIcon = styled.span`
  font-size: 18px;
  margin-right: 4px;
`;

const InfoLine = styled.div`
  font-size: 13px;
  margin-top: 70px;
  color: #002c3e;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Bold = styled.span`
  font-weight: bold;
`;

const BlueLink = styled.a`
  color: #00a0e6;
  margin-left: 8px;
  font-size: 15px;
`;

const DesktopOnly = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOnly = styled.div.attrs({ className: 'mobile-nuevos-medios' })`
  display: none;
  @media (max-width: 768px) {
    display: block;
    text-align: center;
    margin-top: 36px;
    font-size: 20px;
    width: 100%;
  }
`;

const PaymentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('movistar');
  const [paymentType, setPaymentType] = useState('fixed');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fixedOption, setFixedOption] = useState<'telefono' | 'referencia'>('referencia');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const cities = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga'];

  const handleConsultarPagar = async () => {
    setError('');
    // Solo buscamos si hay algo escrito
    if (!phoneNumber) return;
    // Buscar en invoices por payment_reference
    const { data, error: supaError } = await supabase
      .from('invoices')
      .select('*')
      .eq('payment_reference', phoneNumber)
      .single();
    if (supaError || !data) {
      setError('Referencia no encontrada.');
      return;
    }
    // Navegar a /detalle con los datos
    navigate('/detail', { state: {
      full_name: data.full_name,
      payment_reference: data.payment_reference,
      invoice_value: data.invoice_value,
      invoice_pdf: data.invoice_pdf
    }});
  };

  return (
    <>
      <TabsGroup>
        <TabsContainer>
          <Tab active={activeTab === 'movistar'} onClick={() => setActiveTab('movistar')}>
            Movistar
          </Tab>
          <Tab active={activeTab === 'telebucaramanga'} onClick={() => setActiveTab('telebucaramanga')}>
            Antes Telebucaramanga
          </Tab>
          <Tab active={activeTab === 'metrotel'} onClick={() => setActiveTab('metrotel')}>
            Antes Metrotel
          </Tab>
        </TabsContainer>
      </TabsGroup>

      <BillingTitle>
        Mantén tu <span>factura</span> al día!
      </BillingTitle>
      <AutoPayButton>
        <div className="icon-row">
          <img src={relojImg} alt="Reloj" />
          <span className="text-main">Activa y/o administra</span>
        </div>
        <span className="text-sub">tu pago automático</span>
      </AutoPayButton>

      <FormTitle>Pagar mi factura <span>Movistar</span></FormTitle>
      
      <PaymentMethods>
        <PaymentMethod active={paymentType === 'mobile'} onClick={() => setPaymentType('mobile')}>
          Móvil
        </PaymentMethod>
        <PaymentMethod active={paymentType === 'fixed'} onClick={() => setPaymentType('fixed')}>
          Fija
        </PaymentMethod>
      </PaymentMethods>

      {paymentType === 'fixed' && (
        <RadioGroup>
          <RadioLabel>
            <RadioInput
              type="radio"
              name="fixedOption"
              value="telefono"
              checked={fixedOption === 'telefono'}
              onChange={() => setFixedOption('telefono')}
            />
            <CustomRadio />
            Teléfono
          </RadioLabel>
          <RadioLabel>
            <RadioInput
              type="radio"
              name="fixedOption"
              value="referencia"
              checked={fixedOption === 'referencia'}
              onChange={() => setFixedOption('referencia')}
            />
            <CustomRadio />
            Referencia de pago
          </RadioLabel>
        </RadioGroup>
      )}

      {paymentType === 'mobile' && (
        <InputContainer style={{ position: 'relative' }}>
          <span className="icon css-1630ybo" style={{
            position: 'absolute',
            left: 6,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#002c3e',
            fontSize: 22,
            pointerEvents: 'none',
            zIndex: 2,
            display: 'block',
            height: 28,
            width: 28
          }}>
            <img src={smartphoneIcon} alt="icono móvil" style={{ width: 28, height: 28, display: 'block' }} />
          </span>
          <input
            type="text"
            placeholder="Ingresa el número de línea o pago"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ paddingLeft: 32 }}
          />
        </InputContainer>
      )}

      {paymentType === 'fixed' && fixedOption === 'referencia' && (
        <InputContainer style={{ position: 'relative' }}>
          <div className="icon css-1630ybo" style={{ position: 'absolute', left: -4, top: '50%', transform: 'translateY(-50%)', color: '#002c3e', fontSize: 22, pointerEvents: 'none', zIndex: 2, display: 'block', height: 36, width: 36 }}>
            <img src={logoRefe} alt="icono referencia" style={{ width: 36, height: 36, display: 'block' }} />
          </div>
          <input
            type="text"
            placeholder="Ingresa el número de pago"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ paddingLeft: 32 }}
          />
        </InputContainer>
      )}

      {paymentType === 'fixed' && fixedOption === 'telefono' && (
        <InputContainer style={{ position: 'relative' }}>
          <div className="icon css-1630ybo" style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: '#002c3e', fontSize: 22, pointerEvents: 'none', zIndex: 2, display: 'block' }}>
            <i className="icon-icon-telefono" />
          </div>
          <input
            type="text"
            placeholder="Ingresa el número de línea"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ paddingLeft: 32 }}
          />
        </InputContainer>
      )}

      {paymentType === 'fixed' && fixedOption === 'telefono' && (
        <>
          <UnderlineField style={{width: '38%', margin: '0 auto 20px auto'}}>
            <Icon className="icon-location" />
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
              <option value="">Selecciona tu ciudad</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <span className="dropdown-arrow">&#9660;</span>
          </UnderlineField>
          <UnderlineField style={{width: '38%', margin: '0 auto 20px auto'}}>
            <input
              type="text"
              placeholder="Ingresa el número de línea"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </UnderlineField>
        </>
      )}

      <SubmitButton
        enabled={!!phoneNumber}
        disabled={!phoneNumber}
        onClick={handleConsultarPagar}
      >
        Consultar y pagar
      </SubmitButton>

      {error && <div style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>{error}</div>}

      <DesktopOnly>
        <HelpLink href="https://youtu.be/xhBkmTbTAWYvvv" target="_blank" rel="noopener noreferrer">
          ¿Cómo hacer mi pago?
        </HelpLink>
        <PaycoLine>
          <img src={candadoIcon} alt="candado" style={{ width: 22, height: 22, verticalAlign: 'middle', marginRight: 8, display: 'inline-block' }} />
          Pagos procesados por <img src={logoEpay} alt="ePayco" style={{ height: '22px', verticalAlign: 'middle', marginLeft: 4, marginRight: 2, display: 'inline-block' }} />
        </PaycoLine>
      </DesktopOnly>
      <MobileOnly>
        <span style={{ fontWeight: 'bold' }}>Nuevos medios de pago</span> para ti
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '6px 0 0 0', flexDirection: 'column', alignItems: 'center' }}>
          <img src={movistarPagos2} alt="Medios de pago Movistar" style={{ maxWidth: '270px', width: '100vw', height: 'auto', display: 'block' }} />
          <div style={{ display: 'flex', alignItems: 'center', color: '#002c3e', fontSize: 8, marginTop: 8 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: '50%', background: '#002c3e', color: '#fff', fontWeight: 700, fontSize: 14, marginRight: 6 }}>i</span>
            <span>No se aceptan pagos con tarjetas de crédito Internacionales</span>
          </div>
        </div>
      </MobileOnly>

      <FooterInfo>
        <InfoLine>
          <Bold>#QuédateEnCasa</Bold> para más información de lo que estamos haciendo sobre el <Bold>COVID-19</Bold>
          <BlueLink href="https://www.movistar.com.co/covid-19" target="_blank" rel="noopener noreferrer">Haz clic aquí</BlueLink>
        </InfoLine>
      </FooterInfo>
    </>
  );
};

export default PaymentPage; 