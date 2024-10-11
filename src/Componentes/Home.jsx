import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; 
import Card from 'react-bootstrap/Card'; 
import { Link } from 'react-router-dom';

function User() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100"> 
      <Card className="p-4" style={{ backgroundColor: 'slategrey', width: '300px' }}> 
        <Container className='text-center'>
          <Navbar.Brand>
            <h1 className='titulo1'>Lista de tareas</h1> 
          </Navbar.Brand>
          <div className="mt-3"> 
            <Link to="/Login" style={{ textDecoration: 'none' }}> 
              <Button variant="dark" className="me-2">Iniciar Sesión</Button>
            </Link>
            <Link to="/Register"> 
              <Button variant="dark" className="me-2">Registro</Button>
            </Link>
          </div>
        </Container>
      </Card>
    </div>
  );
}

export default User;


