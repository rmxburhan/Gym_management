import { useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';

const useDelete = (url: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const remove = async (): Promise<any | null> => {
        setLoading(true);
        try {
            const response = await axios.delete(url);
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
        } finally {
            setLoading(false);
        }
    };

    return {
        remove,
        isLoading,
        error,
    };
};

export default useDelete;
