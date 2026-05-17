import axios from 'axios';
// import Cookies from 'js-cookie';

    const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
    });


    export const tenantId = "5094c936-5662-43c0-adb6-91804e68359e";
    export const adminId = "0x2bb1cd7008cb4797b1994db73cc47463";

    export const fetchData = async (endpoint) => {
        try {
            const response = await api.get(endpoint);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    export const createData = async (endpoint, data) => {
        try {
            const response = await api.post(endpoint, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    export const updateData = async (endpoint, data) => {
        try {
            const response = await api.put(endpoint, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    export const deleteData = async (endpoint) => {
        try {
            const response = await api.delete(endpoint);
            return response.data;
        } catch (error) {
            throw error;
        }
    };



    /* Channels */

        export const getChannels = () => fetchData('/api/v1/channels');

        export const createChannel = (channelData) => createData('/api/v1/channels', channelData);

        export const updateChannel = (channelId, channelData) => updateData(`/api/v1/channels/${channelId}`, channelData);

        export const deleteChannel = (channelId) => deleteData(`/api/v1/channels/${channelId}`);

        export const getChannelById = (channelId) => fetchData(`/api/v1/channels/${channelId}`);

    /* ChannelCategories */

        export const getChannelCategories = () => fetchData('/api/v1/channel-categories');

        export const createChannelCategory = (categoryData) => createData('/api/v1/channel-categories', categoryData);

        export const updateChannelCategory = (categoryId, categoryData) => updateData(`/api/v1/channel-categories/${categoryId}`, categoryData);

        export const deleteChannelCategory = (categoryId) => deleteData(`/api/v1/channel-categories/${categoryId}`);    
        
        export const getChannelCategoryById = (categoryId) => fetchData(`/api/v1/channel-categories/${categoryId}`);


    /* m3u import */

        export const importM3U = (file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tenantId', tenantId);
            return api.post('/api/v1/m3u/import/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => response.data);
        };