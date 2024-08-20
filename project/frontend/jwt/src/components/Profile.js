import React, { useState, useEffect } from 'react';
import { getProfile } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        getProfile()
            .then(response => {
                setProfile(response.data);
            })
            .catch(err => {
                console.error('Error fetching profile', err);
                setError('Failed to fetch profile. Please login again.');
                navigate('/login'); // Redirect to login on error
            });
    }, [navigate]);

    return (
        <div>
            <h2>Profile</h2>
            {error && <p>{error}</p>}
            {profile ? (
                <div>
                    <p>Username: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
