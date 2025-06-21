import React, { useEffect, useState } from 'react';
import logoEdeq from '../assets/images/logo_edeq.png';
import logo2Edeq from '../assets/images/logo2_edeq.png';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { usePageTitle } from '../hooks/usePageTitle';
import { useFavicon } from '../hooks/useFavicon';

const PageContainer = styled.div`
  text-align: center;
  margin-top: 0;
  overflow-x: hidden;
  width: 100vw;
  max-width: 100vw;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  background-color: #fff;
`;

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const MainTitle = styled.h1`
  font-weight: 700;
  color: #008a99;
  font-size: 24px;
  margin-bottom: 16px;
  line-height: 1.3;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #000;
  margin-bottom: 20px;
  font-weight: 700;
`;

const AddNiuButton = styled.button`
  background: #008a99d6;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 7px 60px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background 0.2s;

  &:hover {
    background: #007a8a;
  }
`;

const NiuInfoText = styled.p`
  font-size: 13px;
  color: #000;
  margin-bottom: 30px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
  font-weight: 700;
`;

const DetailCard = styled.div`
  background: #f7f7f7;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: left;
  border: 1px solid #eee;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
`;

const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const CardAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: right;
`;

const DetailInfo = styled.div`
  font-size: 14px;
  line-height: 1.6;
  font-weight: 700;
  color: #000;
`;

const NiuDetail = styled(DetailInfo)`
    display: flex;
    justify-content: flex-start;
    width: 120px;
    gap: 8px;
    
    span:first-child {
        font-weight: 700;
        color: #000;
    }
    
    span:last-child {
        font-weight: 700;
        color: #666;
    }
`;

const AbonoButton = styled.button`
  background: #008a99d9;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 4px 25px;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;

  &:hover {
    background: #007a8a;
  }
`;

const TotalSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 30px;
  font-size: 18px;
  
  span:first-child {
    font-weight: 700;
  }
  
  span:last-child {
    font-weight: 700;
    color: #333;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
`;

const ActionButton = styled.button<{ solid?: boolean }>`
  background: ${props => props.solid ? '#008a99' : 'transparent'};
  color: ${props => props.solid ? 'white' : '#008a99'};
  border: 2px solid #008a99;
  border-radius: 24px;
  padding: 4px 30px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  min-width: 150px;
  transition: all 0.2s;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const PaymentMethodsContainer = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const PaymentMethodsText = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 15px;
`;

const PaymentMethodLogos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const GreenCheckIcon = () => (
    <svg viewBox="0 0 24 24" style={{width: 24, height: 24, fill: '#28a745', marginRight: 10}}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
    </svg>
);

interface EdeqDetailProps {
  invoiceData?: {
    payment_reference: string;
    invoice_value: number;
    limit_date: string;
    full_name: string;
  };
  onBack?: () => void;
}

const EdeqDetail: React.FC<EdeqDetailProps> = ({ invoiceData: propInvoiceData, onBack }) => {
  usePageTitle('Edeq');
  useFavicon('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABwklEQVR4AdxRQ2AcARTd2nZ7qnupbdu2bduKbdu2bdv2rD1x8mL7mo/bxwNlEASHTDwdT5gplPBiv5ZVcQ8AmDGgA/9jdV4oBS+Acth66EUfhmvGh6J0hosyv5zYD2BKnwcuRSVPjC4Qd1EMXQ2FkBVQCF0JxdBV0I7aB7uUR0WBedKumUxPeUE5cQnAvG6PABiVxfJWtE1+QNOM3AmVejRq4eugFra6vuuPRW6AWexheKc+YxUXmVqxaQn6HFrGr9pKcmnnQ2PKKml3k+guUg6Z0maa8e/yZCKf8T753cIP/6f44PkLF6xUYJyUFO6id608QPNsTMviEGGlYEEAEfBOMl4q8I7f3cJjrifIbXa7scNmP974fam95aKACTK/cNMrLKAm1+k7W2ZmheG3Zbmtn1WTldy2O27DToctOOi0E4edD+CR332WfZaj6UV7MTbl/0XMVRMlGUL6FZ7lWgHxZzicZfeFtMGvLZ9CkAWrwuhxp2KZCcc5ZcXbhRXCQzvMPqRRfm7CPtPfqaks+hayqnJUNRF8HSnm4iQrb1WvDrlmR91cqXOXFAs10/qelDGFMtA4H55YNzag9yQYhjcAAPPzFozWjGUwAAAAAElFTkSuQmCC');
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  
  // Get invoice data from props or from navigation state
  const invoiceData = propInvoiceData || location.state?.invoiceData;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1); // Go back to the previous page
    }
  };

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
    };
  }, []);

  // Redirect if no invoice data is available
  useEffect(() => {
    if (!invoiceData) {
      navigate(-1); // Go back to the previous page instead of a specific route
    }
  }, [invoiceData, navigate]);

  if (!invoiceData) {
    return null; // Don't render anything while redirecting
  }

  const reorderName = (name: string): string => {
    if (!name) return '';
    const parts = name.trim().split(' ').filter(p => p);
    // Handles "LASTNAME1 LASTNAME2 FIRSTNAME" -> "FIRSTNAME LASTNAME1 LASTNAME2"
    if (parts.length >= 3) {
      const firstName = parts.pop();
      if (firstName) {
        return `${firstName} ${parts.join(' ')}`;
      }
    }
    // For 1 or 2 words, assume it's already in the correct format (e.g., "FIRSTNAME LASTNAME")
    return name;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'FECHA INVÁLIDA';
    }
    const day = date.getUTCDate();
    const month = date.toLocaleDateString('es-ES', { month: 'short', timeZone: 'UTC' }).toUpperCase().replace('.', '');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleConsultClick = async () => {
    setError('');
    
    if (!invoiceData) {
      setError('No hay datos de factura disponibles.');
      return;
    }

    // Validar que el invoiceData tenga los datos necesarios
    if (!invoiceData.payment_reference || !invoiceData.invoice_value) {
      setError('Datos de factura incompletos.');
      return;
    }

    try {
      // Verificar que la factura existe en la base de datos
      const { data, error: supaError } = await supabase
        .from('invoices')
        .select('*')
        .eq('payment_reference', invoiceData.payment_reference)
        .single();

      if (supaError || !data) {
        setError('Factura no encontrada o inválida.');
        return;
      }

      // Verificar si existe el PDF
      if (!data.invoice_pdf) {
        setError('No hay PDF disponible para esta factura.');
        return;
      }

      // Abrir el PDF en una nueva pestaña
      window.open(data.invoice_pdf, '_blank');
      
    } catch (error) {
      setError('Error al consultar la factura.');
      console.error('Error:', error);
    }
  };

  return (
    <PageContainer>
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

      <DetailContainer>
        <MainTitle>¡Paga tu factura de energía rápido y seguro!</MainTitle>
        <InfoText>Si pagas en estos momentos, tu pago se verá reflejado en las próximas horas.</InfoText>
        <AddNiuButton>Agrega otro código NIU</AddNiuButton>
        <NiuInfoText>Encontrarás tu NIU (Número de Identificación del Usuario), en la parte superior derecha de tu factura de energía.</NiuInfoText>

        <DetailCard>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <GreenCheckIcon />
              Valor total a pagar
            </div>
            <CardAmount>
                {invoiceData?.invoice_value.toLocaleString('es-CO', {style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0}).replace('COP', '')} COP
            </CardAmount>
          </CardHeader>
          <CardBody>
            <CardInfo>
                <NiuDetail><span>NIU</span> <span>{invoiceData?.payment_reference}</span></NiuDetail>
                <DetailInfo>Nombre: {reorderName(invoiceData?.full_name)}</DetailInfo>
                <DetailInfo>Fecha límite de pago: {formatDate(invoiceData?.limit_date)}</DetailInfo>
                <AbonoButton>Abono</AbonoButton>
            </CardInfo>
          </CardBody>
        </DetailCard>

        <TotalSummary>
            <span>Total a pagar</span>
            <span>{invoiceData?.invoice_value.toLocaleString('es-CO', {style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0}).replace('COP', '')} COP</span>
        </TotalSummary>

        <ActionButtonsContainer>
            <ActionButton onClick={handleBack}>VOLVER</ActionButton>
            <ActionButton solid onClick={handleConsultClick}>CONSULTAR</ActionButton>
        </ActionButtonsContainer>

        {error && <div style={{ color: 'red', textAlign: 'center', marginTop: 10, fontSize: 14 }}>{error}</div>}

        <PaymentMethodsContainer>
          <img src="https://epayco-sftp-clients.s3.amazonaws.com/edeq/img/logo-pasarella.svg" alt="ePayco" style={{ height: 25, marginBottom: 15, display: 'block', margin: '0 auto 15px auto' }} />
          <PaymentMethodsText>Medio de pago disponible</PaymentMethodsText>
          <PaymentMethodLogos>
            <img src="https://www.viajescircular.com.co/wp-content/uploads/2021/06/PSE.png" alt="PSE" style={{ maxHeight: '120px', objectFit: 'contain', marginRight: '2px' }} />
            <img src="https://linea.ccb.org.co/PasarelaPagos/images/logo-daviplata.svg" alt="Daviplata" style={{ maxHeight: '40px', objectFit: 'contain', marginLeft: '2px' }} />
          </PaymentMethodLogos>
        </PaymentMethodsContainer>
      </DetailContainer>

      <style>
        {`
          @media (max-width: 600px) {
            .edeq-header-img {
              height: 55px !important;
              object-fit: cover;
            }
            .edeq-logo2-img {
              margin-top: 0 !important;
              margin-bottom: 20px !important;
            }
          }
        `}
      </style>
    </PageContainer>
  );
};

export default EdeqDetail; 