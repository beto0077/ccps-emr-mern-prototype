import React, { useState, useEffect } from 'react';
import Navbar from '../NavigationBar';
import Footer from '../Footer';
import { Container, Row, Col, Table, Card, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useAttachmentContext } from '../../context/AttachmentContext';

function AttachmentView() {
    const { getAttachment } = useAttachmentContext();
    const [attachmentInfo, setAttachmentInfo] = useState({
        attachment_id: '',
        patient_id: '',
        section_reference: '',
        attachment_type: '',
        file_name: '',
        date_added: '',
        description: '',
        uploader_user_id: ''
    });

    const params = useParams();
    useEffect(() => {
        const loadAttachment = async () => {
            if (params.id) {
                const details = await getAttachment(params.id);
                setAttachmentInfo(details);
            }
        };
        loadAttachment();
    }, []);

    return (
        <div className="bg-dark">
            <Navbar />
            <h2 className="text-white my-3 text-center" style={{ marginTop: '75px' }}>
                Attachment Details
            </h2>
            <Container>
                <Row>
                    <Col>
                        <div className="container ml-3">
                            <Card className="mt-5" style={{ backgroundColor: '#e0e0e0' }}>
                                <Card.Body>
                                    <h2 className="text-primary">Attachment Information</h2>
                                    <Table striped bordered responsive>
                                        <tbody>
                                            <tr>
                                                <td>Attachment ID</td>
                                                <td>{attachmentInfo.attachment_id}</td>
                                            </tr>
                                            <tr>
                                                <td>Patient ID</td>
                                                <td>{attachmentInfo.patient_id}</td>
                                            </tr>
                                            <tr>
                                                <td>Section Reference</td>
                                                <td>{attachmentInfo.section_reference}</td>
                                            </tr>
                                            <tr>
                                                <td>Attachment Type</td>
                                                <td>{attachmentInfo.attachment_type}</td>
                                            </tr>
                                            <tr>
                                                <td>File Name</td>
                                                <td>{attachmentInfo.file_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Date Added</td>
                                                <td>{attachmentInfo.date_added}</td>
                                            </tr>
                                            <tr>
                                                <td>Description</td>
                                                <td>{attachmentInfo.description}</td>
                                            </tr>
                                            <tr>
                                                <td>Uploader User ID</td>
                                                <td>{attachmentInfo.uploader_user_id}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default AttachmentView;