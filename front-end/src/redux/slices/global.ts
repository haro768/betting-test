import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventData } from '../../types';

interface UserState {
    name: string | null;
    email: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    events: EventData[];
    prevEvents: EventData[];
}

const initialState: UserState = {
    name: null,
    email: null,
    status: 'idle',
    error: null,
    events: [],
    prevEvents: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEvents(state, action: PayloadAction<EventData[]>) {
            state.events = action.payload;
        },
        setPrevEvents(state, action: PayloadAction<EventData[]>) {
            state.prevEvents = action.payload;
        },
    },
});

export const { setEvents, setPrevEvents } = userSlice.actions;
export const userReducer = userSlice.reducer;
