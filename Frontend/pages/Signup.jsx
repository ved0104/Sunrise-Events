import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error

    const userData = { username, email, password };

    try {
      const response = await axios.post(
        'http://localhost:5000/users/signup',
        userData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('User registered successfully:', response.data);
      // Optionally redirect or notify the user of success
    } catch (error) {
      // Extract the error message from the response
      const errMsg = error.response?.data?.message || 'Signup failed';
      console.error('Signup error:', errMsg);
      setErrorMessage(errMsg);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
