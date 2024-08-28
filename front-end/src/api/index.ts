import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { LoginUserPayload } from '../types';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiRequest = async <T = any>(
    config: AxiosRequestConfig<LoginUserPayload>
): Promise<AxiosResponse<T>> => {
    try {
        return await axiosInstance.request<T>(config);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error.message;
        } else {
            throw new Error('Unexpected error');
        }
    }
};
