import { useState, useEffect } from 'react';
import axios from 'axios';

const useVacations = () => {
    const [vacations, setVacations] = useState([]);

    useEffect(() => {
        const fetchVacations = async () => {
            const { data } = await axios.get('/api/vacations');
            setVacations(data);
        };
        fetchVacations();
    }, []);

    return vacations;
};

export default useVacations;