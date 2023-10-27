import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function UnauthorizedUser() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const handleOK = async() => {
    setShow(false)
    navigate("/")
  }
  useEffect(() => {
    const handleResize = () => {
      // Update the height of the alert container based on window height
      const newHeight = Math.min(window.innerHeight * 0.8, 600); // You can adjust the maximum height as needed
      setAlertHeight(newHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the height

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [alertHeight, setAlertHeight] = useState(window.innerHeight * 0.8);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#343434' }}>
      <Alert show={show} variant="danger" style={{ maxWidth: '400px', width: '90%', maxHeight: alertHeight, overflowY: 'auto' }}>
        <Alert.Heading>Ooops! an error occurred!</Alert.Heading>
        <p>
          It seems that you are not authorized to view this page. Please press "OK" and log in to view this page correctly.
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button onClick={() => handleOK()} variant="outline-danger">
            OK
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </div>
  );
}

export default UnauthorizedUser;