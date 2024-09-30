import React, { useState, useEffect} from 'react';
import VacationCard from './VacationCard';
import axios from 'axios';

const VacationsPage = () => {
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
  
    const fetchVacations = async (page: number) => {
      const response = await axios.get(`/api/vacations?page=${page}`);
      setVacations(response.data);
    };
  
    useEffect(() => {
      fetchVacations(currentPage);
    }, [currentPage]);
  
    return (
      <div>
        {vacations.map(vacation => (
          <VacationCard key={vacation.id} vacation={vacation} />
        ))}
        <Pagination 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
        />
      </div>
    );
  };
  