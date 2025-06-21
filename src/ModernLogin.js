import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFavicon } from './hooks/useFavicon';
import { usePageTitle } from './hooks/usePageTitle';
import favicon from './assets/images/favicon.jpg';
import logoLogin from './assets/images/logo_login.jpeg';

const ModernLogin = () => {
  useFavicon(favicon);
  usePageTitle('FactuBet');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setUser(null);

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !data) {
      setError('Usuario o contraseña incorrectos');
    } else {
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-avatar">
          <img src={logoLogin} alt="Logo Login" className="login-avatar-img" />
        </div>
        <h2 className="login-title">Iniciar sesión</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <span className="input-icon">
              <svg width="20" height="20" fill="#888" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
              </svg>
            </span>
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="input-icon">
              <svg width="20" height="20" fill="#888" viewBox="0 0 24 24">
                <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-2v-2a6 6 0 1 0-12 0v2a2 2 0 0 0-2 2v2h16v-2a2 2 0 0 0-2-2z"/>
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              style={{background: 'none', border: 'none', cursor: 'pointer', outline: 'none', marginLeft: 4, padding: 0, display: 'flex', alignItems: 'center'}}
            >
              {showPassword ? (
                <svg width="20" height="20" fill="#888" viewBox="0 0 24 24"><path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12c-2.8 0-5.2-1.5-7-4 1.8-2.5 4.2-4 7-4s5.2 1.5 7 4c-1.8 2.5-4.2 4-7 4zm0-7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>
              ) : (
                <svg width="20" height="20" fill="#888" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12zm11 5c-2.8 0-5.2-1.5-7-4 1.8-2.5 4.2-4 7-4 1.1 0 2.1.2 3 .6l-1.5 1.5c-.5-.1-1-.1-1.5-.1a3 3 0 0 0 0 6c.5 0 1-.1 1.5-.1l1.5 1.5c-.9.4-1.9.6-3 .6zm7.7-2.3l-1.4-1.4c.1-.3.2-.7.2-1.3s-.1-1-.2-1.3l1.4-1.4c.5.7.8 1.5.8 2.7s-.3 2-.
8 2.7z"/></svg>
              )}
            </button>
          </div>
          <button className="login-btn" type="submit">Iniciar sesión</button>
          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
      <style>{`
        .login-bg {
          min-height: 100vh;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 1.5px 8px rgba(0,0,0,0.08);
          border: 1.5px solid #f0f4f8;
          padding: 48px 40px 40px 40px;
          max-width: 420px;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: box-shadow 0.25s, transform 0.18s;
        }
        .login-card:hover {
          box-shadow: 0 12px 36px rgba(0,0,0,0.22), 0 2px 12px rgba(0,0,0,0.10);
          transform: translateY(-2px) scale(1.012);
        }
        .login-avatar {
          background: #1a3c4e;
          border-radius: 50%;
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: -36px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          overflow: hidden;
        }
        .login-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
        .login-title {
          margin-top: 56px;
          margin-bottom: 32px;
          font-size: 2rem;
          color: #1a3c4e;
          font-weight: 700;
        }
        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .input-group {
          display: flex;
          align-items: center;
          background: linear-gradient(90deg, #f7fafc 80%, #eaf6fb 100%);
          border-radius: 8px;
          padding: 10px 14px;
          border: 1.2px solid #e3e8ee;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
        }
        .input-icon {
          margin-right: 8px;
          display: flex;
          align-items: center;
        }
        .login-form input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 1rem;
          width: 100%;
          padding: 8px 0;
          color: #1a3c4e;
        }
        .login-btn {
          background: linear-gradient(90deg, #019DF4 60%, #00c6fb 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 14px 0;
          font-size: 1.15rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(1,157,244,0.08);
          letter-spacing: 0.5px;
        }
        .login-btn:hover {
          background: linear-gradient(90deg, #017dc1 60%, #019DF4 100%);
          box-shadow: 0 4px 16px rgba(1,157,244,0.13);
        }
        .login-error {
          color: #e74c3c;
          margin-top: 8px;
          text-align: center;
        }
        @media (max-width: 600px) {
          .login-card {
            padding: 32px 8px 24px 8px;
            max-width: 98vw;
          }
          .login-title {
            font-size: 1.3rem;
            margin-top: 40px;
            margin-bottom: 18px;
          }
          .login-form {
            gap: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernLogin; 