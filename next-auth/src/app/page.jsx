'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/authContext';

export default function Login() {
  const { axiosLogin } = useAuth();
  const [login, setLogin] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosLogin(login, enteredPassword);

    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ maxWidth: '300px', textAlign: 'center' }}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label htmlFor="login" style={{ minWidth: '70px' }}>Login:</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              style={{ flex: '1', padding: '0.5em', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label htmlFor="enteredPassword" style={{ minWidth: '70px' }}>Senha:</label>
            <input
              type="password"
              id="enteredPassword"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              style={{ flex: '1', padding: '0.5em', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '1em', textAlign: 'center' }}>
            <button type="submit" style={{ padding: '0.5em 1em', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}>Entrar</button>
            <a href="#" style={{ marginLeft: '1em', color: '#007bff', textDecoration: 'none' }}>Recuperar a senha</a>
          </div>
        </form>
      </div>
    </div>
  );
}
