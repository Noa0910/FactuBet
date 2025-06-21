import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoEpa1 from '../assets/images/logo_epa1.png';
import logoEpa2 from '../assets/images/logo_epa2.png';
import { supabase } from '../supabaseClient';
import { useFavicon } from '../hooks/useFavicon';
import { usePageTitle } from '../hooks/usePageTitle';

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

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const LoginBox = styled.div`
  width: 100%;
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 5px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    margin-top: 0;
  }
`;

const LoginHeader = styled.div`
  background-color: #f7f7f7;
  padding: 4px 10px;
  border-bottom: 1px solid #ddd;
`;

const LoginBody = styled.div`
  padding: 20px 15px;
`;

const Title = styled.h2`
  text-align: left;
  margin: 0;
  font-size: 1rem;
  color: #333;
  font-weight: 400;
  line-height: 2.5;
`;

const InputLabel = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 8px;
  color: #555;
  font-size: 0.9rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: auto;
  padding: 10px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
`;

const EpaPage: React.FC = () => {
  useFavicon('/favicon-epa.png');
  usePageTitle('EPA');
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleIngresar = async () => {
    setLoading(true);
    setError('');

    if (!matricula) {
      setError('Por favor, ingresa un número de matrícula.');
      setLoading(false);
      return;
    }

    try {
      // Usando la tabla 'invoices' para la validación
      const { data, error: dbError } = await supabase
        .from('invoices')
        .select('*')
        .eq('invoice_number', matricula)
        .single();

      if (dbError || !data) {
        throw new Error('Matrícula no encontrada o inválida.');
      }

      // Si la matrícula es válida, navega a la página de recaudo con los datos
      navigate('/epa-recaudo', { state: { invoiceData: data } });

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al validar la matrícula.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Header>
        <Logo src={logoEpa1} alt="Logo EPA" />
        <Logo src={logoEpa2} alt="Logo República de Colombia" />
      </Header>
      <MainContent>
        <LoginBox>
          <LoginHeader>
            <Title>Ingreso EPA</Title>
          </LoginHeader>
          <LoginBody>
            <InputLabel htmlFor="matricula">Número de Matrícula</InputLabel>
            <InputField
              id="matricula"
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              disabled={loading}
            />
            <SubmitButton onClick={handleIngresar} disabled={loading}>
              {loading ? 'Validando...' : 'Ingresar'}
            </SubmitButton>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          </LoginBody>
        </LoginBox>
        <Footer>
          Todos los derechos reservados Realtech Ltda.
        </Footer>
      </MainContent>
    </PageContainer>
  );
};

export default EpaPage; 