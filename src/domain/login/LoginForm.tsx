import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('admin@example.com');
  const [password, setPassword] = useState('foobar');
  const [, setToken] = useContext(AuthContext);

  const login = async (username: string, password: string): Promise<string | null> => {
    let url = `${process.env.REACT_APP_API_SERVER}/api/v1/login`;
    
    const credentials = `${username}:${password}`; // Use colon ':' to separate username and password
    const base64Credentials = btoa(credentials); // Base64 encode credentials
    
    console.log(credentials);
    
    const headers = {
      "Authorization": `Basic ${base64Credentials}`,
      "Content-Type": "application/json",
    };
    
    try {
      const response = await axios.get(url, { headers });
    
      if (response.status === 200) {
        // Login successful, process the response data
        console.log("Login successful!", response.data);

        const token = response.data;
        setToken(token);
        console.log("Login successful! Token:", token);
        return token;

      } else {
        // Handle other errors (potentially check for 401 here)
        console.error("Error logging in:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = await login(username, password);

    if (token) {
      console.log('Token received:', token);
      // Perform additional actions with the token if needed
    } else {
      console.log('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" value='admin@example.com' onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value='foobar' onChange={(e) => setPassword(e.target.value)} />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;