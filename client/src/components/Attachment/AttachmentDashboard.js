import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Navber from "../NavigationBar";
import { useAttachmentContext } from "../../context/AttachmentContext";

function AttachmentDashboard() {
    const { attachments, loadAttachments, deleteAttachment } = useAttachmentContext();
    const navigate = useNavigate();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

    useEffect(() => {
        loadAttachments(params.id);
        setIsLoading(false);

        const updateAvailableHeight = () => {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const newAvailableHeight = window.innerHeight - navbarHeight;
            setAvailableHeight(newAvailableHeight);
          };
      
        window.addEventListener('resize', updateAvailableHeight);
        updateAvailableHeight();
      
        return () => window.removeEventListener('resize', updateAvailableHeight);
    }, []);

    return (
        <>
        <Navber />
        <div className="bg-dark" style={{ minHeight: `${availableHeight}px` }}>
            
            <br />
            <h2 className="text-white text-center">
                Adjuntos
            </h2>
            <br />
            <div className="text-center">
                <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(`/createAttachment`, { state: { id: params.id } })}
            className="mx-2 my-2 my-lg-3"
          >
            Crear adjunto nuevo
          </Button>
            </div>
            <Container>
                <Row>
                    <Col>
                        <div className="jumbotron mt-5 mb-5" style={{ backgroundColor: "#e0e0e0" }}>
                            <h2 className="text-primary">Adjuntos</h2>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha de agregado</th>
                                        <th>Nombre del adjunto</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isLoading ? (
                                        attachments.map((attachment) => (
                                            <tr key={attachment.attachment_id}>
                                                <td>{attachment.attachment_id}</td>
                                                <td>{attachment.date_added}</td>
                                                <td>{attachment.file_name}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/attachment/${attachment.attachment_id}`)}
                                                    >
                                                        Más detalles
                                                    </Button>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/editAttachment/${attachment.attachment_id}`)}
                                                    >
                                                        Editar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">
                                                <h4>Cargando...</h4>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    );
}

export default AttachmentDashboard;