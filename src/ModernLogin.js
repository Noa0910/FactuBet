import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const ModernLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
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
          <svg width="48" height="48" fill="#fff" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
          </svg>
        </div>
        <h2 className="login-title">My Account</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <span className="input-icon">
              <svg width="20" height="20" fill="#888" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
              </svg>
            </span>
            <input
              type="email"
              placeholder="Login"
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-btn" type="submit">Sign in</button>
          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
      <style>{`
        .login-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #ff6a3d 60%, #b2fefa 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          padding: 40px 32px 32px 32px;
          max-width: 340px;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
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
        }
        .login-title {
          margin-top: 48px;
          margin-bottom: 24px;
          font-size: 1.5rem;
          color: #1a3c4e;
          font-weight: 600;
        }
        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .input-group {
          display: flex;
          align-items: center;
          background: #f3f6fa;
          border-radius: 8px;
          padding: 8px 12px;
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
        }
        .login-btn {
          background: #ff6a3d;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 0;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s;
        }
        .login-btn:hover {
          background: #e55a2a;
        }
        .login-error {
          color: #e74c3c;
          margin-top: 8px;
          text-align: center;
        }
        @media (max-width: 600px) {
          .login-card {
            padding: 32px 8px 24px 8px;
            max-width: 95vw;
          }
          .login-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernLogin; 