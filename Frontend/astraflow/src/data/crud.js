import axios from 'axios';
// import Cookies from 'js-cookie';

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const getAuthHeaders = () => {
        const token = localStorage.getItem('authToken');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem('authToken');
                window.location.replace('/signin');
                return new Promise(() => {}); // halt — never resolves so no error propagates
            }
            return Promise.reject(error);
        }
    );
    
    // login and token management
    export const login = async (username, password) => {
        try {
            const response = await api.post('/api/v1/admins/login', { username, password });
            const data = response.data;
            const token = data;
            if (token) {
                localStorage.setItem('authToken', token);
                localStorage.setItem('tokenSubject', extractSubjectFromToken(token));
                localStorage.setItem('adminId', extractAdminIdFromToken(token));
                setTenantId();
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                localStorage.setItem('authToken', 'authenticated');
            }
            return data;
        } catch (error) {
            throw error;
        }
    };

    export const logout = () => {
        // Remove token from storage
        localStorage.removeItem('authToken');
        // Remove token from axios headers
        delete api.defaults.headers.common['Authorization'];
    };


    export const extractSubjectFromToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.sub;
        } catch (error) {
            console.error('Error extracting subject from token:', error);
            return null;
        }
    };

    const extractAdminIdFromToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.userId;
        } catch (error) {
            console.error('Error extracting adminId from token:', error);
            return null;
        }
    };

    export const getAdminById = async (adminId) => {
        try {
            const response = await api.get(`/api/v1/admins/${adminId}`, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    export const updateAdmin = async (adminId, adminData) => {
        try {
            const response = await api.put(`/api/v1/admins/${adminId}`, adminData, { headers: getAuthHeaders() });
            return response.data;
        }
        catch (error) {
            throw error;
        }
    };

    export const changePassword = async (adminId, currentPassword, newPassword) => {
        try {
            const response = await api.patch(`/api/v1/admins/${adminId}/change-password`, { currentPassword, newPassword }, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const setTenantId = async () => {
        try {
            const admin = await getAdminById(localStorage.getItem('adminId'));
            localStorage.setItem('tenantId', admin?.tenant?.id || '');
            return admin?.tenant?.id || null;
        } catch (error) {
            console.error('Error fetching tenant ID:', error);
            return null;
        }
    };


    export const tenantId = localStorage.getItem('tenantId') || "";
    export const adminId = localStorage.getItem('adminId') || "";
    export const clientId = "96a567a1-60e4-4e18-ab2d-b1eed136a776";

    export const fetchData = async (endpoint) => {
        try {
            const response = await api.get(endpoint, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    export const createData = async (endpoint, data) => {
        try {
            const response = await api.post(endpoint, data, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    export const updateData = async (endpoint, data) => {
        try {
            const response = await api.put(endpoint, data, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    export const deleteData = async (endpoint) => {
        try {
            const response = await api.delete(endpoint, { headers: getAuthHeaders() });
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
                    ...getAuthHeaders(),
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => response.data);
        };

    
    /* Plans */
        
        export const getPlans = () => fetchData('/api/v1/plans');

        export const createPlan = (planData) => createData('/api/v1/plans', planData);

        export const updatePlan = (planId, planData) => updateData(`/api/v1/plans/${planId}`, planData);
        
        export const deletePlan = (planId) => deleteData(`/api/v1/plans/${planId}`);

        export const getPlanById = (planId) => fetchData(`/api/v1/plans/${planId}`);

    /* Subscriptions */

        export const getSubscriptions = () => fetchData('/api/v1/subscriptions');

        export const createSubscription = (subscriptionData) => createData('/api/v1/subscriptions', subscriptionData);

        export const updateSubscription = (subscriptionId, subscriptionData) => updateData(`/api/v1/subscriptions/${subscriptionId}`, subscriptionData);

        export const deleteSubscription = (subscriptionId) => deleteData(`/api/v1/subscriptions/${subscriptionId}`);
        
        export const getSubscriptionById = (subscriptionId) => fetchData(`/api/v1/subscriptions/${subscriptionId}`);


    /* Support Tickets */

        export const getSupportTickets = () => fetchData('/api/v1/support-tickets');

        export const createSupportTicket = (ticketData) => createData('/api/v1/support-tickets', ticketData);

        export const updateSupportTicket = (ticketId, ticketData) => updateData(`/api/v1/support-tickets/${ticketId}`, ticketData);

        export const deleteSupportTicket = (ticketId) => deleteData(`/api/v1/support-tickets/${ticketId}`);

        export const getSupportTicketById = (ticketId) => fetchData(`/api/v1/support-tickets/${ticketId}`);


    /* Branding */

        export const getBrandingByTenantId = (tenantId) => fetchData(`/api/v1/brandings/tenant/${tenantId}`);

        export const updateBranding = (brandingId, brandingData) => updateData(`/api/v1/brandings/${brandingId}`, brandingData);

    /* Tenant */

        export const getTenantInfo = () => fetchData(`/api/v1/tenants/${tenantId}`);

        export const updateTenantInfo = (tenantData) => updateData(`/api/v1/tenants/${tenantId}`, tenantData);