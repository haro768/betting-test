export interface RegisterUserPayload {
    name: string;
    email: string;
    password: string;
}

export interface LoginUserPayload {
    email: string;
    password: string;
}

export interface EventData {
    event_id: number;
    event_name: string;
    odds: string;
    betAmount?: number;
}