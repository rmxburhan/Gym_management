import { useState } from 'react';
import { api } from '../network/api';
import { useNavigate } from 'react-router';
import { AxiosPromise, isAxiosError } from 'axios';

const usePost = (url: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const post = async (payload: any, id?: string) => {
        try {
            setLoading(true);
            const response = await api.post(url + `/${id || ''}`, payload);
            return response;
        } catch (error: any) {
            if (isAxiosError(error)) {
                if (error.response?.status === 401) {
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
        }
    };

    return {
        isLoading,
        error,
        post,
    };
};
export default usePost;
