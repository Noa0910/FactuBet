import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

function CustomLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setUser(null);

    // Consulta a la tabla users
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password) // ¡No recomendado en producción!
      .single();

    if (error || !data) {
      setError('Usuario o contraseña incorrectos');
    } else {
      setUser(data);
      setTimeout(() => {
        navigate('/');
      }, 1000); // Redirige después de 1 segundo
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Iniciar sesión (custom tabla users)</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </form>
      {user && (
        <div style={{marginTop: 20, color: 'green'}}>
          <p>¡Login exitoso!</p>
          <p>Bienvenido, {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default CustomLogin; 