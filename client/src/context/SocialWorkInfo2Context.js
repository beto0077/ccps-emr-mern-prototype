import { createContext, useContext, useState } from 'react';

import {
    createSocialWorkInfo2Request,
    getSocialWorkInfo2Request,
    updateSocialWorkInfo2Request,
    deleteSocialWorkInfo2Request 
} from '../api/socialWorkInfo2.api.js';

const SocialWorkInfo2Context = createContext();

export const useSocialWorkInfo2Context = () => {
    const context = useContext(SocialWorkInfo2Context);
    if (context === undefined) {
        throw new Error("useSocialWorkInfo2Context must be used within a SocialWorkInfo2Provider");
    }
    return context;
};

export const SocialWorkInfo2Provider = ({ children }) => {
    const [socialWorkInfos2, setSocialWorkInfos2] = useState([]);

    const deleteSocialWorkInfo2 = async (id) => {
        try {
            const response = await deleteSocialWorkInfo2Request(id);
            setSocialWorkInfos2(socialWorkInfos2.filter((info) => info.social_work_info2_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status);
            return error.response.status;   
        }
    };

    const createSocialWorkInfo2 = async (info) => {
        try {
            const response = await createSocialWorkInfo2Request(info);
            return response;
        } catch (error) {
            console.log(error)   
        }
    };

    const getSocialWorkInfo2 = async (id) => {
        try {
            const response = await getSocialWorkInfo2Request(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateSocialWorkInfo2 = async (id, newFields) => {
        try {
            const response = await updateSocialWorkInfo2Request(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SocialWorkInfo2Context.Provider 
            value={{
                socialWorkInfos2,
                deleteSocialWorkInfo2,
                createSocialWorkInfo2,
                getSocialWorkInfo2,
                updateSocialWorkInfo2
            }}
        >
            {children}
        </SocialWorkInfo2Context.Provider>
    );
};