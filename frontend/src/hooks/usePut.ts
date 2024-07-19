import { useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';

const usePut = (url: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const update = async (payload: any): Promise<any | null> => {
        setLoading(true);
        try {
            const response = await axios.put(url, payload);
            return response;
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 401) {
                    navigate('/login');
                } else if (error.response?.status === 403) {
                } else {
                    setError(error.message);
                }
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        update,
        isLoading,
        error,
    };
};

export default usePut;
