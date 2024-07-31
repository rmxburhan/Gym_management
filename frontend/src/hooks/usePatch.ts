import { useState } from 'react';
import { api } from '../network/api';
import { useNavigate } from 'react-router';
import { isAxiosError } from 'axios';
import useAuth from '@/context/Auth';

const usePatch = (url: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const patch = async (payload: any, extensionUrl?: string) => {
        try {
            setError('');
            setLoading(true);
            const response = await api.patch(
                url + `/${extensionUrl || ''}`,
                payload
            );
            return response;
        } catch (error: any) {
            if (isAxiosError(error)) {
                if (error.response?.status === 401) {
                    logout();
                    navigate('/login');
                } else if (error.response?.status === 403) {
                    // navigate forbidden
                } else {
                    if (error.response) {
                        setError(
                            error.response.data.message ||
                                error.response.data.errors
                        );
                    } else {
                        setError(error.message);
                    }
                }
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        isLoading,
        error,
        patch,
    };
};
export default usePatch;
