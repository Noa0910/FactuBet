import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Si usas autenticación nativa de Supabase, puedes llamar a supabase.auth.signOut()
    // Aquí solo redirigimos al login, pero puedes limpiar cualquier estado si lo necesitas
    await supabase.auth.signOut(); // No afecta si usas login custom, pero es seguro llamarlo
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
      <button style={{ margin: 16, padding: '16px 32px', fontSize: 18 }} onClick={() => navigate('/movistar.recaudo')}>
        Movistar
      </button>
      <button style={{ margin: 16, padding: '16px 32px', fontSize: 18 }} onClick={() => navigate('/edeq')}>
        EDEQ
      </button>
      <button style={{ margin: 32, padding: '12px 28px', fontSize: 16, background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }} onClick={handleLogout}>
        Salir
      </button>
    </div>
  );
};

export default HomePage; 