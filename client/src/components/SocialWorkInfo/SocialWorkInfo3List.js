import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Navber from "../NavigationBar";
import { useSocialWorkInfo3Context } from "../../context/SocialWorkInfo3Context";
import { useSocialWorkInfo1Context } from "../../context/SocialWorkInfo1Context";
function SocialWorkInfo3List() {
    const { getSocialWorkInfo1 } = useSocialWorkInfo1Context();
    const { socialWorkInfos3,
        loadSocialWorkInfo3s,
        deleteSocialWorkInfo3 } = useSocialWorkInfo3Context();
    const navigate = useNavigate();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

    useEffect(() => {

        const loadSocialWorkInfo1 = async () => {
            if (params.id) {
                try {
                    const details = await getSocialWorkInfo1(params.id);
                    if (Object.keys(details).length === 0) { // Check if the response is empty
                        setError(true); // Set error state to true
                    } else {
                        setError(false); // Reset error state if data is loaded successfully
                    }
                } catch (error) {
                    console.error('Failed to load physical therapy info:', error);
                    setError(true); // Set error state to true on catch
                }
            }
        };
        loadSocialWorkInfo1();

        loadSocialWorkInfo3s(params.id);
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
        {error ? (
            <div className="text-center mt-5">
                <h2 className="text-black text-center">
                Se debe completar información general primero
            </h2>
                <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(-1)}
            className="mx-2 my-2 my-lg-3"
          >
            Volver
          </Button>
            </div>
        ) : (
        <div className="bg-dark" style={{ minHeight: `${availableHeight}px` }}>
            
            <br />
            <h2 className="text-white text-center">
                Seguimientos de trabajo social
            </h2>
            <br />
            <div className="text-center">
                <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(`/createSocialWorkInfo3`, { state: { id: params.id } })}
            className="mx-2 my-2 my-lg-3"
          >
            Crear nota nueva
          </Button>
            </div>
            <Container>
                <Row>
                    <Col>
                        <div className="jumbotron mt-5 mb-5" style={{ backgroundColor: "#e0e0e0" }}>
                            <h2 className="text-primary">Seguimientos</h2>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Evolución</th>
                                        <th>Tratamiento</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isLoading ? (
                                        socialWorkInfos3.map((socialWorkInfo) => (
                                            <tr key={socialWorkInfo.social_work_info3_id}>
                                                <td>{socialWorkInfo.social_work_info3_id}</td>
                                                <td>{socialWorkInfo.evolution}</td>
                                                <td>{socialWorkInfo.treatment}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-secondary"
                                                        className="mr-2"
                                                        onClick={() => navigate(`/socialWorkInfo3/${socialWorkInfo.social_work_info3_id}`)}
                                                    >
                                                        Más detalles
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
        )}
        </>
    );
}

export default SocialWorkInfo3List;