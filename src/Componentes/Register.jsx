import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Usuario registrado con éxito');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Error de servidor');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='formulario'>
      <h2>Registrarse</h2>
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
            required
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
            required
          />
        </Col>
      </Form.Group>

      {message && <p style={{ color: message.includes('éxito') ? 'green' : 'red' }}>{message}</p>} 

      <Button variant="dark" type="submit">
        Registrarse
      </Button>
    </Form>
  );
}

export default Register;
