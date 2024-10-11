import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import datos from '../Datos.json';

function ActiveExample() {
  const [tareas, setTareas] = useState(datos.tareas);
  const [nuevaTarea, setNuevaTarea] = useState({ nombre: '', descripcion: '' });
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleCheck = (id) => {
    const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasActualizadas);
  };

  const cambiarEstado = (id, nuevoEstado) => {
    const tareasActualizadas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, estado: nuevoEstado } : tarea
    );
    setTareas(tareasActualizadas);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarea((prev) => ({ ...prev, [name]: value }));
  };

  const agregarTarea = (e) => {
    e.preventDefault();
    const nueva = { ...nuevaTarea, id: tareas.length + 1, estado: 'Pendiente' };
    setTareas([...tareas, nueva]);
    setNuevaTarea({ nombre: '', descripcion: '' }); 
  };

 
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  return (
    <Card className="cardtareas">
      <Card.Body className='tareas'>
        <h1>Mis Tareas</h1>
        <Button variant="danger" onClick={handleLogout} style={{ marginBottom: '20px' }}>
          Cerrar Sesión
        </Button>
        <Form onSubmit={agregarTarea}>
          <Form.Group controlId="formTareaNombre">
            <Form.Label>Nombre de la tarea</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={nuevaTarea.nombre}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTareaDescripcion">
            <Form.Label>Descripción de la tarea</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={nuevaTarea.descripcion}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit" style={{ marginTop: '10px' }}>
            Agregar tarea
          </Button>
        </Form>

        <ListGroup as="ul" style={{ marginTop: '20px' }}>
          {tareas.map((tarea) => (
            <ListGroup.Item key={tarea.id} as="li">
              <input
                type="checkbox"
                onChange={() => handleCheck(tarea.id)}
                style={{ marginRight: '10px' }}
              />
              {tarea.nombre} - {tarea.descripcion} - <strong>{tarea.estado}</strong>
              <div style={{ marginTop: '10px' }}>
                {tarea.estado !== 'Completada' && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => cambiarEstado(tarea.id, 'Completada')}
                    style={{ marginRight: '5px' }}
                  >
                    Completar
                  </Button>
                )}
                {tarea.estado !== 'En progreso' && (
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => cambiarEstado(tarea.id, 'En progreso')}
                    style={{ marginRight: '5px' }}
                  >
                    En progreso
                  </Button>
                )}
                {tarea.estado !== 'Pendiente' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => cambiarEstado(tarea.id, 'Pendiente')}
                  >
                    Pendiente
                  </Button>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default ActiveExample;
