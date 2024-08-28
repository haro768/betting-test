import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../api";
import { AxiosError } from "axios";

interface PostEventPayload {
    event_id?: number;
    odds?: number;
    betAmount: number;
}

interface ApiResponse<T> {
    data: T;
}

export const postEventData = createAsyncThunk(
    'events/postEventData',
    async (payload: PostEventPayload, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                return rejectWithValue('Token not found');
            }

            const response = await apiRequest<ApiResponse<PostEventPayload>>({
                url: '/events',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: payload as any,
            });

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data || 'An error occurred');
        }
    }
);