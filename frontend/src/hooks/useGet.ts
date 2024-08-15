import { useEffect, useState } from 'react';
import { api } from '../network/api';
import { useNavigate } from 'react-router';
import useAuth from '@/context/Auth';
import { isAxiosError } from 'axios';

interface FetchState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    refresh: () => void;
}

const useGet = <T>(url: string): FetchState<T> => {
    const navigate = useNavigate();
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { logout } = useAuth();
    useEffect(() => {
        refresh();
    }, [url]);

    const refresh = () => {
        setError('');
        api.get<T>(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                if (isAxiosError(error)) {
                    if (error.response?.status == 401) {
                        logout();
                        navigate('/login');
                    }
                    setError(
                        error.response?.data.message ||
                            error.response?.data.errors ||
                            error.message
                    );
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return {
        data,
        isLoading,
        error,
        refresh,
    };
};

export default useGet;
