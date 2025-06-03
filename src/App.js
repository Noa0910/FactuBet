import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PaymentPage from './components/PaymentPage';
import Header from './components/Header';
import imagen1 from './assets/images/imagen1.png';
import HomePage from './pages/HomePage';
import EdeqPage from './pages/EdeqPage';
import ModernLogin from './ModernLogin';
import Dashboard from './pages/Dashboard';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00a0e6',
    },
    secondary: {
      main: '#019DF4',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
});

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const MainContent = styled.div`
  display: flex;
  padding: 0;
  gap: 0;
  overflow: visible;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PaymentSection = styled.div`
  width: 62%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    width: 40%;
  }

  @media (max-width: 768px) {
    width: 100%;
    > * {
      width: 100%;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

const PromoContainer = styled.div`
  width: 40%;
  height: fit-content;
  margin-bottom: 120px;
  margin-top: 0;

  img {
    position: fixed;
    right: 0;
    top: 72px;
    height: 80vh;
    width: auto;
    object-fit: cover;
    z-index: 10;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 0;
    img {
      position: static;
      width: 100vw;
      max-width: 100vw;
      height: auto;
      max-height: 200px;
      object-fit: contain;
      margin-top: 16px;
      margin-left: 0;
      margin-right: 0;
      display: block;
    }
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movistar.recaudo" element={
              <>
                <Header />
                <MainContent>
                  <PaymentSection>
                    <PaymentPage />
                  </PaymentSection>
                  <PromoContainer>
                    <img src={imagen1} alt="Promoción" />
                  </PromoContainer>
                </MainContent>
              </>
            } />
            <Route path="/edeq" element={<EdeqPage />} />
            <Route path="/login" element={<ModernLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App; 