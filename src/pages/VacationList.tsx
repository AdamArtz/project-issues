import React from 'react';
import VacationCard from '../components/VacationCard';
import useVacations from '../hooks/useVacations';

const VacationList: React.FC = () => {
    const vacations = useVacations();

    return (
        <div>
            {vacations.map((vacation) => (
                <VacationCard key={vacation.id} {...vacation} />
            ))}
        </div>
    );
};

export default VacationList;