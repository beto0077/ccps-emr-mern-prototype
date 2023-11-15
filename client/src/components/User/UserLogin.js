import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useUserContext } from "../../context/UserContext";

function UserLogin() {
  const { loginUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email_address") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      email === process.env.REACT_APP_DEV_EMAIL &&
      password === process.env.REACT_APP_DEV_PASSWORD
    ) {
      navigate("/devForm");
    } else {
      const user = {
        email_address: email,
        password,
      };

      try {
        const token = await loginUser(user);
        if (
          token.status === 401 ||
          token.status === 404 ||
          token.status === 500
        ) {
          setErrorAlert(token.data.message);
        } else {
          const decodedToken = jwt_decode(token);
          sessionStorage.setItem("usertoken", token);
          sessionStorage.setItem("userData", JSON.stringify(decodedToken));
          navigate("/patientSearch");
        }
      } catch (error) {
        console.log(error.message);
        setErrorAlert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="body">
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form noValidate onSubmit={onSubmit}>
              <h1
                className="mb-2 font-weight-normal btn-rg"
                style={{ marginTop: "100px" }}
              >
                Inicio de sesión
              </h1>
              <h4
                className="h3 mb-3 font-weight-normal btn-rg"
                style={{ marginTop: "100px" }}
              >
                Por favor indentifiquese
              </h4>
              <div className="form-group btn-rg mb-3">
                <label htmlFor="email_address">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  name="email_address"
                  placeholder="Ingrese su correo electrónico"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group btn-rg">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  style={{ marginTop: "30px", marginRight: "50px" }}
                  variant="primary"
                  type="submit"
                >
                  Iniciar sesión
                </Button>
                <Button
                  style={{ marginTop: "30px" }}
                  variant="outline-secondary"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
            {errorAlert && (
              <Alert
                className="mt-3"
                variant="danger"
                onClose={() => setErrorAlert("")}
                dismissible
              >
                {errorAlert}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
