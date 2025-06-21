import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoEpa1 from '../assets/images/logo_epa1.png';
import logoEpa2 from '../assets/images/logo_epa2.png';
// Asegúrate de tener este logo en tu carpeta de assets
import logoEpay from '../assets/images/logo_epay.png'; 
import logoPseEpa from '../assets/images/logo-pse-epa.png'; 
import VisibilityIcon from '@mui/icons-material/Visibility';

// --- Componentes de Layout (Reutilizados de EpaPage) ---
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const Logo = styled.img`
  height: 100px;
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

// --- Componentes Específicos de la Página de Recaudo ---
const Card = styled.div`
  width: 100%;
  max-width: 500px;
  border: 1px solid #c8a2c8;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const CardHeader = styled.div`
  background-color: #f7f7f7;
  padding: 15px 20px;
  border-bottom: 1px solid #c8a2c8;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
  text-align: center;
`;

const CardBody = styled.div`
  padding: 20px;
`;

const InfoRowNoBorder = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

const InfoRowWithBorder = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 10px;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

const PaddedInfoLabel = styled(InfoLabel)`
  padding-left: 15px;
`;

const InfoValue = styled.span`
  color: #555;
  font-weight: bold;
`;

const PaddedInfoValue = styled(InfoValue)`
  padding-right: 15px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: center;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-size: 0.9rem;
`;

const ValueBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  text-align: center;
`;

const SelectBox = styled.select`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
  background-color: white;
`;

const FieldValue = styled.div`
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
`;

const PseLogo = styled.img`
  max-width: 150px;
  margin: 20px auto;
  display: block;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;


const EpaRecaudo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Aquí recibes los datos de la factura desde la página anterior
  const invoiceData = location.state?.invoiceData || {};
  const [idType, setIdType] = useState(invoiceData.owner_id_type || 'C.C');

  const handleViewInvoice = () => {
    if (invoiceData.invoice_pdf) {
      window.open(invoiceData.invoice_pdf, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <PageContainer>
      <Header>
        <Logo src={logoEpa1} alt="Logo EPA" />
        <Logo src={logoEpa2} alt="Logo República de Colombia" />
      </Header>

      <MainContent>
        <Card>
          <CardHeader>
            <CardTitle>Resumen del pago</CardTitle>
          </CardHeader>
          <CardBody>
            <InfoRowNoBorder>
              <InfoLabel>Referencia:</InfoLabel>
              <InfoValue>{invoiceData.payment_reference || '69123059'}</InfoValue>
            </InfoRowNoBorder>
            <InfoRowWithBorder>
              <PaddedInfoLabel>Valor a Pagar:</PaddedInfoLabel>
              <PaddedInfoValue>${new Intl.NumberFormat('es-CO').format(invoiceData.invoice_value || 100544)}</PaddedInfoValue>
            </InfoRowWithBorder>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <FormLabel>Nombre propietario</FormLabel>
              <ValueBox>
                <FieldValue>{invoiceData.full_name || 'ANGIE VALENTINA RIOS MARTINEZ'}</FieldValue>
              </ValueBox>
            </FormGroup>

            <FormGroup>
              <FormLabel>Número de identificación</FormLabel>
              <ValueBox>
                <FieldValue>{invoiceData.id_number || ''}</FieldValue>
              </ValueBox>
            </FormGroup>

            <FormGroup>
              <FormLabel>Tipo de identificación</FormLabel>
              <SelectBox value={idType} onChange={(e) => setIdType(e.target.value)}>
                <option value="C.C">C.C</option>
                <option value="PASAPORTE">PASAPORTE</option>
              </SelectBox>
            </FormGroup>
            
            <PseLogo src={logoPseEpa} alt="Logo PSE EPA" />

            <ButtonContainer>
              <StyledButton onClick={() => navigate('/epa')}>Salir</StyledButton>
              <StyledButton onClick={handleViewInvoice} disabled={!invoiceData.invoice_pdf}>
                Ver Factura <VisibilityIcon sx={{ fontSize: '1.2rem', color: 'rgba(0, 0, 0, 0.4)' }} />
              </StyledButton>
            </ButtonContainer>
          </CardBody>
        </Card>
      </MainContent>
    </PageContainer>
  );
};

export default EpaRecaudo; 