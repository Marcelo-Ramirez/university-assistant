import React, { useState } from 'react';
import '../styles/RegisterModal.css';

const RegisterModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [carrera, setCarrera] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  if (!isOpen) return null;

  const handleRegister = async () => {
    const response = await fetch(`${window.origin}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, carrera }),
    });

    if (response.ok) {
      alert('Usuario registrado correctamente');
      onClose();
    } else {
      alert('Error al registrar el usuario');
    }
  };

  const handleLogin = async () => {
    const response = await fetch(`${window.origin}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      alert('Logeo exitoso');
      onClose();
    } else {
      alert('El usuario ya existe o la contraseña es incorrecta');
    }
  };

  return (
    <div className="register-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registro'}</h2>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {!isLogin && (
          <input  
            type="text"
            placeholder="Carrera"
            value={carrera}
            onChange={(e) => setCarrera(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={isLogin ? handleLogin : handleRegister}>
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
