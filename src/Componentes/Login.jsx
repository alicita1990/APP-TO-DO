import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'; 

function PlaintextExample() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Login exitoso');
        navigate('/tasklist'); // Redirigir a Tasklist
      } else {
        setError(data.message); 
      }
    } catch (err) {
      setError('Error de servidor');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='formulario'>
      <h1>Inicia sesión </h1> 
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextUsername">
        <Form.Label column sm="2">
          Usuario
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Contraseña
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Col>
      </Form.Group>

      {error && <p style={{ color: 'red' }}>{error}</p>} 

      <Button type="submit" variant="dark"> 
        Iniciar Sesión
      </Button>
    </Form>
  );
}

export default PlaintextExample;
