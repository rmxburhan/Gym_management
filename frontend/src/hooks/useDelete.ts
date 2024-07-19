import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { api } from '@/network/api';

const useDelete = (url: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [error]);

    const remove = async (id: string): Promise<any | null> => {
        setLoading(true);
        try {
            const response = await api.delete(url + `/${id}`);
            return response;
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 401) {
                    navigate('/login');
                } else if (error.response?.status === 403) {
                } else {
                    setError(error.response?.data.message);
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
