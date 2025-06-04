import React from 'react';
import styled from 'styled-components';
import imagen2 from '../assets/images/imagen2.png';
import logoEpay from '../assets/images/logo_epay.png';

const HeaderContainer = styled.header`
  background: white;
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100vw;
  left: 0;
  overflow-x: hidden;
  @media (max-width: 768px) {
    padding: 8px 0;
    width: 100vw;
    min-width: 0;
    left: 0;
    overflow-x: hidden;
  }
`;

const HeaderCard = styled.div`
  width: 100%;
  margin: 0 auto;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: hidden;
  @media (max-width: 768px) {
    max-width: 85%;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.10);
    padding: 8px 14px;
    overflow-x: hidden;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  box-sizing: border-box;
  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 0 8px;
    width: 100vw;
    min-width: 0;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 55px;
    width: auto;
    @media (max-width: 768px) {
      height: 38px;
      max-width: 60px;
    }
  }
`;

const PaymentInfo = styled.div`
  display: none;
`;

const MobilePaymentInfo = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    margin-left: 8px;
    font-size: 12px;
    color: #2d174c;
    font-weight: 500;
    gap: 4px;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderCard>
        <HeaderContent>
          <Logo>
            <img src={imagen2} alt="Movistar" />
          </Logo>
          <MobilePaymentInfo>
            Pagos procesados por <img src={logoEpay} alt="ePayco" style={{ height: '18px', verticalAlign: 'middle', marginLeft: 4, marginRight: 2, display: 'inline-block' }} />
          </MobilePaymentInfo>
        </HeaderContent>
      </HeaderCard>
    </HeaderContainer>
  );
};

export default Header;