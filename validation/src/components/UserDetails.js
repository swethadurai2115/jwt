// src/components/UserDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDetails.css'; // Import CSS for styling

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users'); // Adjust the endpoint as needed
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="UserDetails">
      <h1>User Details</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
