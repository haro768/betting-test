import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../api/index";
import {RegisterUserPayload} from "../../../types";

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData: RegisterUserPayload, { rejectWithValue }) => {
        try {
            const response = await apiRequest({
                url: '/auth/signup',
                method: 'POST',
                data: userData,
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);