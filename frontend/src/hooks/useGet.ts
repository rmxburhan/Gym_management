import { useEffect, useState } from 'react';
import { api } from '../network/api';
import { useNavigate } from 'react-router';

interface FetchState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

const useGet = <T>(url: string): FetchState<T> => {
    const navigate = useNavigate();
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get<T>(url)
            .then((response: any) => {
                setData(response.data.data);
            })
            .catch((error) => {
                if (error.response?.status == 401) {
                    navigate('/login');
                }
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    return {
        data,
        isLoading,
        error,
    };
};

export default useGet;
