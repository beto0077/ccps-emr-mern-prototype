import { createContext, useContext, useState } from 'react';

import { loginRequest, getUsersRequest, createUserRequest, getUserRequest, updateUserRequest, deleteUserRequest } from '../api/user.api';

const UserContext = createContext();

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider");
    }

    return context;
}

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    async function loadUsers() {
        const response = await getUsersRequest();
        setUsers(response.data);
    }

    const deleteUser = async (id) => {
        try {
            const response = await deleteUserRequest(id);
            setUsers(users.filter((user) => user.user_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status);
            return error.response.status;
        }
    }

    const createUser = async (user) => {
        try {
            await createUserRequest(user);
        } catch (error) {
            console.log(error);
        }
    }

    const getUser = async (id) => {
        try {
            const response = await getUserRequest(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (id, newFields) => {
        try {
            const response = await updateUserRequest(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const loginUser = async (user) => {
        try {
            const response = await loginRequest(user);
            return response.data.token;
        } catch (error) {
            console.log(error.response.status);
            return error.response;
        }
    }

    return (
        <UserContext.Provider 
            value={{
                users, loadUsers, deleteUser, createUser, getUser, updateUser, loginUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
}