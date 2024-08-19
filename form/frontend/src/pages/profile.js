import React, { useState, useEffect, useContext } from 'react'; 
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => { 
    const { user, dispatch } = useContext(AuthContext);
    const [userName, setUsername] = useState(''); 

    
    useEffect(() => {
        if (user) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${user}`;

            const getUserProfile = async () => {
                try {
                    const res = await axios.get('http://localhost:3001/profile');
                    setUsername(res.data.username); 
                    console.log(res.data);
                } catch (e) {
                    console.error(e);
                }
            };

            getUserProfile();
        }
    }, [user]); 

    return (
        <div>
            Welcome {userName || 'Guest'} 
        </div>
    );
}

export default Profile;
