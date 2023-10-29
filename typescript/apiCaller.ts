import { ISignup, ILogin, IGetProfileReturn, IUpdateProfileReturn, IResetPasswordReturn } from './interfaces';
import { apiClient } from './apiConfig';
import { apiCall } from './apiHelper';

interface IAuthAPI {
    signup: (data: ISignup) => Promise<{ success: boolean, data?: any, error?: string }>;
    login: (data: ILogin) => Promise<{ success: boolean, data?: any, error?: string }>;
    updateProfile: (id: number, data: Partial<ISignup>) => Promise<{ success: boolean, data?: IUpdateProfileReturn, error?: string }>;
    verifyEmail: (code: string) => Promise<{ success: boolean, data?: any, error?: string }>;
    resendEmailVerification: (data: { email: string }) => Promise<{ success: boolean, data?: any, error?: string }>;
    getProfile: (id: number) => Promise<{ success: boolean, data?: IGetProfileReturn, error?: string }>;
    forgotPassword: (email: string) => Promise<{ success: boolean, data?: any, error?: string }>;
    resetPassword: (code: string, password: string) => Promise<{ success: boolean, data?: IResetPasswordReturn, error?: string }>;
}

interface IAuthEndpoints {
    signUp: string;
    login: string;
    updateProfile: string;
    verifyEmail: (code: string) => string;
    resendEmailVerification: string;
    fetchProfile: string;
    forgotPassword: string;
    resetPassword: string;
}

export const authAPIEndpoints: IAuthEndpoints = {
    signUp: '/auth/signup',
    login: '/auth/login',
    updateProfile: '/profile/update',
    verifyEmail: (code: string) => `/auth/verify?code=${code}`,
    resendEmailVerification: '/auth/request-email-verif',
    fetchProfile: '/profile/fetch',
    forgotPassword: '/recovery/forgot-password',
    resetPassword: '/recovery/reset-password'
};

export const authAPI: IAuthAPI = {
    signup: (data: ISignup) =>
        apiCall('signUp', () => apiClient.post(authAPIEndpoints.signUp, data), 'Signup successful', 'Signup failed'),

    login: async (data: ILogin) => {
        const response = await apiCall('login', () => apiClient.post(authAPIEndpoints.login, data), 'Login successful', 'Login failed');
        
        const { success, data: responseData } = response;
        if (success && responseData?.token?.token) {
            localStorage.setItem('token', responseData.token.token);
        }
        
        return response;
    },

    updateProfile: (id: number, data: Partial<ISignup>) =>
        apiCall('updateProfile', () => apiClient.put(authAPIEndpoints.updateProfile, data), 'Profile updated', 'Updating profile failed'),

    verifyEmail: (code: string) =>
        apiCall('verifyEmail', () => apiClient.get(authAPIEndpoints.verifyEmail(code)), 'Email verified', 'Email verification failed'),

    resendEmailVerification: (data: { email: string }) =>
        apiCall('resendEmailVerification', () => apiClient.post(authAPIEndpoints.resendEmailVerification, data), 'Verification email resent', 'Resending verification email failed'),

    getProfile: (id: number) =>
        apiCall('fetchProfile', () => apiClient.get(authAPIEndpoints.fetchProfile), 'Profile fetched', 'Fetching profile failed'),

    forgotPassword: (email: string) =>
        apiCall('forgotPassword', () => apiClient.post(authAPIEndpoints.forgotPassword, { email }), 'Forgot password email sent', 'Forgot password failed'),

    resetPassword: (code: string, password: string) =>
        apiCall('resetPassword', () => apiClient.post(authAPIEndpoints.resetPassword, { code, password }), 'Password reset successful', 'Password reset failed')
};
