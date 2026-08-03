import axios from 'axios';
// import Cookies from 'js-cookie';

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    });

    const getAuthHeaders = () => {
        const token = localStorage.getItem('authToken');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

/*
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            const isRegister = error.config?.url?.includes('/register');
            if (error.response?.status === 401 && !isRegister) {
                localStorage.removeItem('authToken');
                window.location.replace('/signin');
                return new Promise(() => {}); // halt — never resolves so no error propagates
            }
            return Promise.reject(error);
        }
    );
*/

    // login and token management
    export const login = async (username, password) => {
        try {
            const response = await api.post('/api/v1/clients/login', { username, password });
            const data = response.data;
            const token = data;
            if (token) {
                localStorage.setItem('authToken', token);
                localStorage.setItem('tokenSubject', extractSubjectFromToken(token));
                localStorage.setItem('clientId', extractClientIdFromToken(token));
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
        localStorage.removeItem('tokenSubject');
        localStorage.removeItem('clientId');
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

    const extractClientIdFromToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.userId;
        } catch (error) {
            console.error('Error extracting clientId from token:', error);
            return null;
        }
    };

    export const getClientById = async (clientId) => {
        try {
            const response = await api.get(`/api/v1/clients/${clientId}`, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    export const updateAdmin = async (clientId, adminData) => {
        try {
            const response = await api.put(`/api/v1/clients/${clientId}`, adminData, { headers: getAuthHeaders() });
            return response.data;
        }
        catch (error) {
            throw error;
        }
    };

    export const changePassword = async (clientId, currentPassword, newPassword) => {
        try {
            const response = await api.patch(`/api/v1/clients/${clientId}/change-password`, { currentPassword, newPassword }, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const setTenantId = async () => {
        try {
            const admin = await getClientById(localStorage.getItem('clientId'));
            localStorage.setItem('tenantId', admin?.tenant?.id || '');
            return admin?.tenant?.id || null;
        } catch (error) {
            console.error('Error fetching tenant ID:', error);
            return null;
        }
    };


    export const tenantId = localStorage.getItem('tenantId') || "";
    export const clientId = localStorage.getItem('clientId') || "";


    export const register = async (fullName, username, email, password, phone, tenantId) => {
        try {
            const response = await api.post('/api/v1/clients/register', {
                username,
                password,
                email,
                fullName,
                phone,
                tenant: { id: tenantId },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };





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


    /* Channels Fetching */

        export const fetchChannels = async () => {
            const tid = localStorage.getItem('tenantId');
            const response = await api.get(`/api/v1/channels/tenant/${tid}`, { headers: getAuthHeaders() });
            return response.data;
        };

        export const fetchChannelById = async (channelId) => {
            const response = await api.get(`/api/v1/channels/${channelId}`, { headers: getAuthHeaders() });
            return response.data;
        };



    /* Channel Categories Fetching */

        export const fetchCategories = async () => {
            const tid = localStorage.getItem('tenantId');
            const response = await api.get(`/api/v1/channel-categories/tenant/${tid}`, { headers: getAuthHeaders() });
            return response.data;
        };

        export const fetchCategoryById = async (categoryId) => {
            const response = await api.get(`/api/v1/channel-categories/${categoryId}`, { headers: getAuthHeaders() });
            return response.data;
        };


    /* is Email verified */

        export const isEmailVerified = async (clientId) => {
            try {
                const response = await api.get(`/api/v1/clients/${clientId}/email-verified`, { headers: getAuthHeaders() });
                return response.data;
            } catch (error) {
                console.error('Error checking email verification:', error);
                return false;
            }
        };

    /* verify email */

        export const verifyEmail = async (code) => {
            try {
                const response = await api.post(`/api/v1/auth/verify-email`, { code }, { headers: getAuthHeaders() });
                return response.data;
            } catch (error) {
                console.error('Error verifying email:', error);
                throw error;
            }
        };

    /* resend verification email */

        export const resendVerificationEmail = async (email) => {
            try {
                const response = await api.post(`/api/v1/auth/resend-verification`, { email }, { headers: getAuthHeaders() });
                return response.data;
            }
            catch (error) {
                console.error('Error resending verification email:', error);
                throw error;
            }
        };

    /* fetch plans */

        export const fetchPlans = async () => {
            const tid = localStorage.getItem('tenantId');
            const response = await api.get(`/api/v1/plans/tenant/${tid}/active`, { headers: getAuthHeaders() });
            return response.data;
        }

    /* stripe checkout session */

        /* create payment intent */

            export const createCheckoutSession = async ({planId, clientId}) => {
                try {
                    const response = await api.post(`/api/v1/stripe/create-payment-intent`, { planId, clientId }, { headers: getAuthHeaders() }); 
                    return response.data;
                } catch (error) {
                    console.error('Error creating checkout session:', error);
                    throw error;
                }
            };


    /* fetch subscription */

        /* is subscribed */
            
            export const fetchSubscriptionStatus = async (clientId) => {
                try {
                    const response = await api.get(`/api/v1/subscriptions/client/${clientId}/subscribed`, { headers: getAuthHeaders() });
                    return response.data;
                }
                catch (error) {
                    console.error('Error fetching subscription status:', error);
                    throw error;
                }
            };

        /* Subscription Plan */

            export const fetchSubscriptionPlan = async (clientId) => {
                try {
                    const response = await api.get(`/api/v1/subscriptions/client/${clientId}/plan`, { headers: getAuthHeaders() });
                    return response.data;
                }
                catch (error) {
                    console.error('Error fetching subscription plan:', error);
                    throw error;
                }
            };


        /* Favorite Channels */

            export const fetchFavoriteChannels = async (clientId) => {
                try {
                    const response = await api.get(`/api/v1/favorites/client/${clientId}/all`, { headers: getAuthHeaders() });
                    return response.data;
                }
                catch (error) {
                    console.error('Error fetching favorite channels:', error);
                    throw error;
                }
            };

            export const addFavoriteChannel = async (clientId, channelId) => {
                try {
                    const response = await api.post(`/api/v1/favorites/create`, { clientId, channelId }, { headers: getAuthHeaders() });
                    return response.data;
                }
                catch (error) {
                    console.error('Error adding favorite channel:', error);
                    throw error;
                }
            };

            export const removeFavoriteChannel = async (favoriteId) => {
                try {
                    const response = await api.delete(`/api/v1/favorites/${favoriteId}`, { headers: getAuthHeaders() });
                    return response.data;
                }
                catch (error) {
                    console.error('Error removing favorite channel:', error);
                    throw error;
                }
            };

    
        /* Tickets */

            export const fetchTickets = async (clientId) => {
                try {
                    const response = await api.get(`/api/v1/tickets/client/${clientId}/all`, { headers: getAuthHeaders() });
                    return response.data;
                }
                catch (error) {
                    console.error('Error fetching tickets:', error);
                    throw error;
                }
            };

            export const createTicket = async (clientId, subject, description) => {
                try {
                    const response = await api.post(`/api/v1/tickets/create`, { clientId, subject, description }, { headers: getAuthHeaders() });
                    return response.data;
                }
                catch (error) {
                    console.error('Error creating ticket:', error);
                    throw error;
                }
            };

            
            

        
