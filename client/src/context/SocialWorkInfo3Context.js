import { createContext, useContext, useState } from 'react';

import { 
    getSocialWorkInfosRequest, 
    createSocialWorkInfoRequest, 
    deleteSocialWorkInfoRequest, 
    getSocialWorkInfoRequest, 
    updateSocialWorkInfoRequest 
} from '../api/socialWorkInfo3.api';

const SocialWorkInfo3Context = createContext();

export const useSocialWorkInfo3Context = () => {
    const context = useContext(SocialWorkInfo3Context);
    if (context === undefined) {
        throw new Error("useSocialWorkInfo3Context must be used within a SocialWorkInfo3Provider");
    }
    return context;
};

export const SocialWorkInfo3Provider = ({ children }) => {
    const [socialWorkInfos, setSocialWorkInfos] = useState([]);

    async function loadSocialWorkInfos() {
        const response = await getSocialWorkInfosRequest();
        setSocialWorkInfos(response.data);
    }

    const deleteSocialWorkInfo = async (id) => {
        await deleteSocialWorkInfoRequest(id);
        setSocialWorkInfos(socialWorkInfos.filter((info) => info.social_work_info3_id !== id));
    };

    const createSocialWorkInfo = async (info) => {
        await createSocialWorkInfoRequest(info);
    };

    const getSocialWorkInfo = async (id) => {
        const response = await getSocialWorkInfoRequest(id);
        return response.data;
    };

    const updateSocialWorkInfo = async (id, newFields) => {
        await updateSocialWorkInfoRequest(id, newFields);
    };

    return (
        <SocialWorkInfo3Context.Provider 
            value={{
                socialWorkInfos, loadSocialWorkInfos, deleteSocialWorkInfo, createSocialWorkInfo, getSocialWorkInfo, updateSocialWorkInfo
            }}
        >
            {children}
        </SocialWorkInfo3Context.Provider>
    );
};