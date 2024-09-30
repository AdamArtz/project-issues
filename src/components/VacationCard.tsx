import React from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const VacationCard: React.FC<VacationProps> = ({ id, destination, description, price, availability }) => {
    const { user } = useAuth();

    const handleFollow = async () => {
        await axios.post('/api/follow', { vacation_id: id }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
    };

    const handleUnfollow = async () => {
        await axios.post('/api/unfollow', { vacation_id: id }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
    };

    return (
        <div className="vacation-card">
            <h2>{destination}</h2>
            <p>{description}</p>
            <p>Price: ${price}</p>
            <p>{availability ? "Available" : "Sold Out"}</p>
            {user && (
                <>
                    <button onClick={handleFollow}>Follow</button>
                    <button onClick={handleUnfollow}>Unfollow</button>
                </>
            )}
        </div>
    );
};