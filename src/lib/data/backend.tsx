import axios, { AxiosInstance } from 'axios';

interface RegisterPayload {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    phone_number: string;
    adresse: string;
    birth_date: string;
    profile_picture: string;
    is_verified: boolean;
    role: string;
}

export class ApiRequest {
    private baseUrl: string;
    private axiosInstance: AxiosInstance;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_BACK_END_URL as string;
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Méthode pour enregistrer un utilisateur
    async register(payload: RegisterPayload): Promise<void> {
        console.log('Registering user with payload:', payload);
        try {
            const response = await this.axiosInstance.post('/auth/register', payload);
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    }

    // Méthode pour connecter un utilisateur et récupérer le token
    async login(email: string, password: string): Promise<void> {
        try {
            const response = await this.axiosInstance.post('/auth/login', { email, password });
            const authToken = response.data.token;
            console.log('Login successful, token:', authToken);
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
}

export default new ApiRequest();
