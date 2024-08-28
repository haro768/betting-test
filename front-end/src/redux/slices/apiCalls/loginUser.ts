import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../api/index";
import {LoginUserPayload} from "../../../types";

export const loginUser = createAsyncThunk(
    'user/registerUser',
    async (userData: LoginUserPayload, { rejectWithValue }) => {
        try {
            const response = await apiRequest({
                url: '/auth/signin',
                method: 'POST',
                data: userData,
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);