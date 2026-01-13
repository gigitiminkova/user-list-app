import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

function UserList() {
  const [listOfUser, setListOfUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from JSONPlaceholder API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setListOfUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <div className="users-grid">
        {listOfUser.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <h2>{user.name}</h2>
              <span className="user-id">#{user.id}</span>
            </div>
            <div className="user-info">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Website:</strong> {user.website}</p>
              <p><strong>Company:</strong> {user.company.name}</p>
              <p><strong>City:</strong> {user.address.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;