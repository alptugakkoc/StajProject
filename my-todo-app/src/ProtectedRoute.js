import React, { useEffect, useState } from 'react';

function ProtectedRoute() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setMessage('You are not authorized');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/protected', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.text();
          setMessage(data);
        } else {
          setMessage('You are not authorized');
        }
      } catch (error) {
        console.error('Error fetching protected data:', error);
        setMessage('An error occurred. Please try again later.');
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Protected Route</h1>
      <p>{message}</p>
    </div>
  );
}

export default ProtectedRoute;
