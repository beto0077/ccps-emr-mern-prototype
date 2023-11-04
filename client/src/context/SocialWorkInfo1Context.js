import { createContext, useContext, useState } from 'react';

import { 
    createSocialWorkInfo1Request, getSocialWorkInfo1Request, updateSocialWorkInfo1Request, deleteSocialWorkInfo1Request 
} from '../api/socialWorkInfo1.api.js';

const SocialWorkInfo1Context = createContext();

export const useSocialWorkInfo1Context = () => {
    const context = useContext(SocialWorkInfo1Context);
    if (context === undefined) {
        throw new Error("useSocialWorkInfo1Context must be used within a SocialWorkInfo1Provider");
    }
    return context;
};

export const SocialWorkInfo1Provider = ({ children }) => {
    const [socialWorkInfos1, setSocialWorkInfos1] = useState([]);

    const deleteSocialWorkInfo1 = async (id) => {
        try {
            const response = await deleteSocialWorkInfo1Request(id);
            setSocialWorkInfos1(socialWorkInfos1.filter((info) => info.social_work_info1_id !== id));
            return response;
        } catch (error) {
            console.log(error.response.status);
            return error.response.status;   
        }
    };

    const createSocialWorkInfo1 = async (info) => {
        try {
            const response = await createSocialWorkInfo1Request(info);
            return response;
        } catch (error) {
            console.log(error)   
        }
    };

    const getSocialWorkInfo1 = async (id) => {
        try {
            const response = await getSocialWorkInfo1Request(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateSocialWorkInfo1 = async (id, newFields) => {
        try {
            const response = await updateSocialWorkInfo1Request(id, newFields);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SocialWorkInfo1Context.Provider 
            value={{
                socialWorkInfos1, deleteSocialWorkInfo1, createSocialWorkInfo1, getSocialWorkInfo1, updateSocialWorkInfo1
            }}
        >
            {children}
        </SocialWorkInfo1Context.Provider>
    );
};