//STOP!!

import React, { useState, useEffect } from "react";
import Navbar from "../NavigationBar";
import Footer from "../Footer";
import { Container, Row, Col, Table, Card, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useAttachmentContext } from "../../context/AttachmentContext";

function AttachmentView() {
  const { getAttachment } = useAttachmentContext();
  const [attachmentInfo, setAttachmentInfo] = useState({
    attachment_id: "",
    patient_id: "",
    section_reference: "",
    attachment_type: "",
    file_name: "",
    file_content: "",
    date_added: "",
    description: "",
    uploader_user_id: "",
  });

  const params = useParams();
  /*useEffect(() => {
    const loadAttachment = async () => {
      if (params.id) {
        const details = await getAttachment(params.id);
        // Assuming details.file_content is the Buffer object you logged
        const base64String = btoa(
          //String.fromCharCode(...new Uint8Array(details.file_content.data))
          String.fromCharCode(...new Uint8Array(details.file_content.data))
        );
        console.log(base64String);
        // Set the file_content to the base64 string
        setAttachmentInfo({ ...details, file_content: base64String });
      }
    };
    loadAttachment();
  }, [params.id]);*/
  useEffect(() => {
    const loadAttachment = async () => {
      if (params.id) {
        const details = await getAttachment(params.id);
        console.log(details.file_content);
        if (details.file_content && details.file_content.data) {
          // Convert the Buffer object to a base64 string
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(details.file_content.data))
          );
          // Determine the MIME type
          const mimeType = getMimeType(details.file_name);
          // Convert the base64 string to a Blob
          const blob = new Blob([Uint8Array.from(atob(base64String), c => c.charCodeAt(0))], { type: mimeType });
          // Create a blob URL
          const blobUrl = URL.createObjectURL(blob);
          // Update the state with the new URL
          /*setAttachmentInfo(prevState => ({
            ...prevState,
            file_content: blobUrl,
          }));*/
          setAttachmentInfo({ ...details, file_content: blobUrl });
        }
      }
    };
    loadAttachment();
  
    // Cleanup function to revoke the blob URL when the component unmounts
    return () => {
      if (attachmentInfo.file_content) {
        URL.revokeObjectURL(attachmentInfo.file_content);
      }
    };
  }, [params.id, getAttachment]);

  const getMimeType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    const mimeTypes = {
      pdf: "application/pdf",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
    };
    return mimeTypes[extension] || "application/octet-stream";
  };

  const renderAttachment = () => {
    const mimeType = getMimeType(attachmentInfo.file_name);
    const base64Src = `data:${mimeType};base64,${attachmentInfo.file_content}`;

    if (attachmentInfo.attachment_type === "pdf") {
      return (
        <iframe
          src={base64Src}
          width="100%"
          height="600px"
          title="Attachment Preview"
        />
      );
    } else if (attachmentInfo.attachment_type === "image") {
      return <img src={base64Src} alt="Attachment" />;
    }
  };

  const attachmentHref = `data:${getMimeType(
    attachmentInfo.file_name
  )};base64,${attachmentInfo.file_content}`;

  return (
    <div className="bg-dark">
      <Navbar />
      <h2 className="text-white my-3 text-center" style={{ marginTop: "75px" }}>
        Attachment Details
      </h2>
      <Container>
        <Row>
          <Col>
            <div className="container ml-3">
              <Card className="mt-5" style={{ backgroundColor: "#e0e0e0" }}>
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
                        <td>Attachment</td>
                        <td>
                          {" "}
                          <a
                            href={attachmentInfo.file_content}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Open Attachment
                          </a>
                        </td>
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
