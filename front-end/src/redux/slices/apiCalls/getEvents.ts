import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../api";
import { EventData } from "../../../types";

export const fetchNewEvents = createAsyncThunk(
    'events/fetchNewEvents',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                return rejectWithValue('Token not found');
            }

            const response = await apiRequest({
                url: '/events',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data as EventData[];
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);
