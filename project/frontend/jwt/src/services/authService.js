import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = (username, email, password) => {
    return axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
    });
};

export const login = (email, password) => {
    return axios.post(`${API_URL}/login`, {
        email,
        password,
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

export const getProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return axios.get(`${API_URL}/profile`, {
            headers: {
                'x-access-token': user.token
            }
        });
    }
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
