import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAttachmentContext } from "../../context/AttachmentContext";

function AttachmentForm() {
    const location = useLocation();
    const { createAttachment, getAttachment, updateAttachment } = useAttachmentContext();
    const [attachment, setAttachment] = useState({
        patient_id: location.state?.id || "",
        section_reference: "",
        attachment_type: "",
        file_name: "",
        file_content: null, // This will hold the uploaded file (Blob)
        date_added: "",
        description: "",
        uploader_user_id: ""
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadAttachment = async () => {
            if (params.id) {
                const loadedAttachment = await getAttachment(params.id);
                setAttachment(loadedAttachment);
            }
        };
        loadAttachment();
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttachment((prevAttachment) => ({
            ...prevAttachment,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setAttachment((prevAttachment) => ({
                ...prevAttachment,
                file_content: reader.result,
                file_name: file.name,
                attachment_type: file.type
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (params.id) {
            await updateAttachment(params.id, attachment);
        } else {
            await createAttachment(attachment);
        }
        navigate(`/attachmentDashboard/${location.state.id}`); // Assuming there's a route for attachments
    };

    return (
        <div style={{ display: 'block', margin: 'auto', width: 400, padding: 30 }}>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">
                    {params.id ? "Edit Attachment" : "New Attachment"}
                </h1>
                <Form.Group controlId="formPatientId">
                    <Form.Label>Patient ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="patient_id"
                        placeholder="Enter patient ID"
                        onChange={handleChange}
                        value={attachment.patient_id}
                    />
                </Form.Group>

                <Form.Group controlId="formSectionReference">
                    <Form.Label>Section Reference</Form.Label>
                    <Form.Control
                        type="text"
                        name="section_reference"
                        placeholder="Enter section reference"
                        onChange={handleChange}
                        value={attachment.section_reference}
                    />
                </Form.Group>

                <Form.Group controlId="formAttachmentType">
                    <Form.Label>Attachment Type</Form.Label>
                    <Form.Control
                        type="text"
                        name="attachment_type"
                        placeholder="Enter attachment type (e.g., image, pdf)"
                        onChange={handleChange}
                        value={attachment.attachment_type}
                    />
                </Form.Group>

                <Form.Group controlId="formFileName">
                    <Form.Label>File Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="file_name"
                        placeholder="Enter file name"
                        onChange={handleChange}
                        value={attachment.file_name}
                    />
                </Form.Group>

                <Form.Group controlId="formDateAdded">
                    <Form.Label>Date Added</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_added"
                        onChange={handleChange}
                        value={attachment.date_added}
                    />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        placeholder="Enter description"
                        onChange={handleChange}
                        value={attachment.description}
                    />
                </Form.Group>

                <Form.Group controlId="formUploaderUserId">
                    <Form.Label>Uploader User ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="uploader_user_id"
                        placeholder="Enter uploader user ID"
                        onChange={handleChange}
                        value={attachment.uploader_user_id}
                    />
                </Form.Group>

                <Form.Group controlId="formFileContent">
                    <Form.Label>Upload File (Image/PDF)</Form.Label>
                    <Form.Control
                        type="file"
                        name="file_content"
                        onChange={handleFileChange}
                    />
                </Form.Group>

                <Button style={{ marginTop: '30px' }} variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
}

export default AttachmentForm;