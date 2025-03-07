import { axiosInstance } from '../axiosInstance';

export const login = async (credentials: { username: string; password: string }) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response;
};

export const register = async (userData: { username: string; password: string; role: string }) => {
    const response = await axiosInstance.post('/auth/signup', userData);
    return response;
};

export const logout = async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response;
};
