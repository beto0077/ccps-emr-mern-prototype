import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";

function UserProfile() {
    const { getUser } = useUserContext();
    const [userInfo, setUserInfo] = useState({
        email_address: "",
        user_name: "",
        role: ""
    });

    const params = useParams();

    useEffect(() => {
        const loadData = async () => {
            const userDetails = await getUser(params.id);
            setUserInfo({
                email_address: userDetails.email_address,
                user_name: userDetails.user_name,
                role: userDetails.role
            });
        };

        loadData();
    }, [params.id]);

    return (
        <div className="bg-dark">
            <br />
            <h2 className="text-white" align="center">
                User Profile
            </h2>
            <h3 className="text-white" align="center">
                Welcome!
            </h3>
            <br />
            <div className="row">
                <div className="col">
                    <div className="container ml-3">
                        <div
                            className="jumbotron mt-5"
                            style={{ backgroundColor: "#e0e0e0" }}
                        >
                            <div className="col-sm-6">
                                <h2 className="text-primary">User Information</h2>
                            </div>
                            <br />

                            <table className="table col-md-6">
                                <tbody>
                                    <tr>
                                        <td> Name</td>
                                        <td>
                                            {userInfo.user_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{userInfo.email_address}</td>
                                    </tr>
                                    <tr>
                                        <td>Role</td>
                                        <td>{userInfo.role}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;