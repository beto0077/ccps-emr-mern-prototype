import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navber from '../NavigationBar';
import { useUserContext } from '../../context/UserContext';

function UserLogin() {
    const { loginUser } = useUserContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorAlert, setErrorAlert] = useState('');

    const navigate = useNavigate();

    const onChange = e => {
        const { name, value } = e.target;
        if (name === 'email_address') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const onSubmit = async e => {
        e.preventDefault();

        /*
        const user = {
            email_address: email,
            password,
        };

        try {
            const token = await loginUser(user);
            if(token.status === 401 || token.status === 404 || token.status === 500) {
                setErrorAlert(token.data.message);
            } else {
                const decodedToken = jwt_decode(token);
                sessionStorage.setItem('usertoken', token);
                sessionStorage.setItem('userData', JSON.stringify(decodedToken));
                navigate("/patientSearch");
            }
        } catch (error) {
            console.log(error.message);
            setErrorAlert("An error occurred. Please try again later.");
        }*/
        //TESTING
        navigate("/patientSearch");
    };

    return (
        <div className="body">
            <Navber />
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal btn-rg" style={{ marginTop: '100px' }}>
                                Please sign in
                            </h1>
                            <div className="form-group btn-rg">
                                <label htmlFor="email_address">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email_address"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group btn-rg">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block mb-5"
                                style={{marginTop:'2rem'}}
                            >
                                Sign in
                            </button>
                        </form>
                        {errorAlert && (
                            <Alert variant="danger" onClose={() => setErrorAlert('')} dismissible>
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