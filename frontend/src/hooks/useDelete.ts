import { useState } from 'react';
import { AxiosResponse, isAxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { api } from '@/network/api';
import useAuth from '@/context/Auth';

const useDelete = (url: string) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const remove = async (id: string): Promise<AxiosResponse | any> => {
        setLoading(true);
        try {
            setError('');
            const response = await api.delete(url + `/${id}`);
            return response;
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 401) {
                    logout();
                    navigate('/login');
                } else if (error.response?.status === 403) {
                    // show forbidden
                } else {
                    setError(
                        error.response?.data.message ||
                            error.response?.data.errors
                    );
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
