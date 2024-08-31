import { useState, useEffect } from 'react';
import {useErrorContext} from './useErrorContext';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setError } = useErrorContext();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                const result = await response.json();
                if (!response.ok) {
                    setError(result.message);
                }
                console.log(result);
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading};
};

export default useFetch;
