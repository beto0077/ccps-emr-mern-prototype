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
        await deleteSocialWorkInfo3Request(id);
        setSocialWorkInfos3(socialWorkInfos3.filter((info) => info.social_work_info3_id !== id));
    };

    const createSocialWorkInfo3 = async (info) => {
        await createSocialWorkInfo3Request(info);
    };

    const getSocialWorkInfo3 = async (id) => {
        const response = await getSocialWorkInfo3Request(id);
        return response.data;
    };

    const updateSocialWorkInfo3 = async (id, newFields) => {
        await updateSocialWorkInfo3Request(id, newFields);
    };

    return (
        <SocialWorkInfo3Context.Provider 
            value={{
                socialWorkInfos: socialWorkInfos3, loadSocialWorkInfos: loadSocialWorkInfo3s, deleteSocialWorkInfo: deleteSocialWorkInfo3, createSocialWorkInfo: createSocialWorkInfo3, getSocialWorkInfo: getSocialWorkInfo3, updateSocialWorkInfo: updateSocialWorkInfo3
            }}
        >
            {children}
        </SocialWorkInfo3Context.Provider>
    );
};