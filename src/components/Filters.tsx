import React, { useState, useEffect } from "react";

const Filters = ({ setFilters }: { setFilters: (filters: any) => void }) => {
    const [onlyFollowed, setOnlyFollowed] = useState(false);
    const [notStarted, setNotStarted] = useState(false);
    const [activeVacations, setActiveVacations] = useState(false);
  
    useEffect(() => {
      setFilters({ onlyFollowed, notStarted, activeVacations });
    }, [onlyFollowed, notStarted, activeVacations]);
  
    return (
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={onlyFollowed} 
            onChange={(e) => setOnlyFollowed(e.target.checked)} 
          />
          Show only followed vacations
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={notStarted} 
            onChange={(e) => setNotStarted(e.target.checked)} 
          />
          Show vacations that have not started
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={activeVacations} 
            onChange={(e) => setActiveVacations(e.target.checked)} 
          />
          Show active vacations
        </label>
      </div>
    );
  };
  