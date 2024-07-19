import { useState } from 'react';
import { api } from '../network/api';
import { useNavigate } from 'react-router';
import { isAxiosError } from 'axios';

const usePost = async (url: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const post = async (payload: any): Promise<any | null> => {
        try {
            setLoading(true);
            const response = api.post(url, payload);
            return response;
        } catch (error: any) {
            if (isAxiosError(error)) {
                if (error.response?.status === 401) {
                    navigate('/login');
                } else if (error.response?.status === 403) {
                    // navigate forbidden
                } else {
                    setError(error.message);
                }
            }
            return null;
        }
    };

    return {
        isLoading,
        error,
        post,
    };
};
export default usePost;
