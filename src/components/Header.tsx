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
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 0 16px;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 55px;
    width: auto;
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
    margin-left: 12px;
    font-size: 13px;
    color: #2d174c;
    font-weight: 500;
    gap: 6px;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <img src={imagen2} alt="Movistar" />
        </Logo>
        <MobilePaymentInfo>
          Pagos procesados por <img src={logoEpay} alt="ePayco" style={{ height: '18px', verticalAlign: 'middle', marginLeft: 4, marginRight: 2, display: 'inline-block' }} />
        </MobilePaymentInfo>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 