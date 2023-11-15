import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="page-footer font-small pt-4 bg-primary text-white">
      <Container className="text-center text-md-left">
        <Row>
          <Col md="6" className="mt-md-0 mt-3">
            <h5 className="text-uppercase font-weight-bold">Contacto:</h5>
            <p>Correo electrónico: sarchipaliativos@gmail.com</p>
            <p>Teléfono: 2454-4758</p>
          </Col>
          <hr className="clearfix w-100 d-md-none pb-3" />
          <Col md="6" className="mb-md-0 mb-3">
            <h5 className="text-uppercase font-weight-bold">Dirección:</h5>
            <p>Sarchí, Alajuela, Costa Rica</p>
          </Col>
        </Row>
      </Container>
      <div className="footer-copyright text-center py-3 bg-primary">
        © 2023 Copyright: <span>nhhospitalltd.com</span>
      </div>
    </footer>
  );
}

export default Footer;