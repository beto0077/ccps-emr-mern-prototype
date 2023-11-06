import { createContext, useContext, useState } from 'react';

import { 
    getSocialWorkInfo3sRequest, 
    createSocialWorkInfo3Request, 
    deleteSocialWorkInfo3Request, 
    getSocialWorkInfo3Request, 
    updateSocialWorkInfo3Request 
} from '../api/socialWorkInfo3.api.js';

const SocialWorkInfo3Context = createContext();

export const useSocialWorkInfo3Context = () => {
    const context = useContext(SocialWorkInfo3Context);
    if (context === undefined) {
        throw new Error("useSocialWorkInfo3Context must be used within a SocialWorkInfo3Provider");
    }
    return context;
};

export const SocialWorkInfo3Provider = ({ children }) => {
    const [socialWorkInfos3, setSocialWorkInfos3] = useState([]);

    async function loadSocialWorkInfo3s() {
        const response = await getSocialWorkInfo3sRequest();
        setSocialWorkInfos3(response.data);
    }

    const deleteSocialWorkInfo3 = async (id) => {
        try {
            const response = await deleteSocialWorkInfo3Request(id);
            setSocialWorkInfos3(socialWorkInfos3.filter((info) => info.social_work_info3_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status);
            return error.response.status;   
        }
    };

    const createSocialWorkInfo3 = async (info) => {
        try {
            const response = await createSocialWorkInfo3Request(info);
            return response;
        } catch (error) {
            console.log(error)   
        }
    };

    const getSocialWorkInfo3 = async (id) => {
        try {
            const response = await getSocialWorkInfo3Request(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateSocialWorkInfo3 = async (id, newFields) => {
        try {
            const response = await updateSocialWorkInfo3Request(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SocialWorkInfo3Context.Provider 
            value={{
                socialWorkInfos3,
                loadSocialWorkInfo3s,
                deleteSocialWorkInfo3,
                createSocialWorkInfo3,
                getSocialWorkInfo3,
                updateSocialWorkInfo3
            }}
        >
            {children}
        </SocialWorkInfo3Context.Provider>
    );
};