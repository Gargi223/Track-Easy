import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import {useState} from "react"
import { useNavigate } from "react-router-dom";
import './login.css'


function Login() {
  
  const [email, setEmail] = useState(""); // Initialize with an empty string
  const [password, setPassword] = useState(""); // Initialize with an empty string
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", { email, password });

      // Check if the response contains a token
      if (response.data.token) {
        // Save token and user ID in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        console.log("Login successful!");
        navigate("/home"); // Redirect to home page
      } else {
        console.error("Login failed: No token received.");
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Error during login. Please try again.");
    }
  };

    return(
       <div className="lgn">


     {/* <nav className="navbar navbar-dark bg-dark nv ">
        <div className="container-fluid">
          <a className="navbar-brand">Tracker</a>
          <div className="d-flex">
            <button className="btn btn-outline-success" type="button"  onClick={() => window.location.href = "/login"}>
              Login
            </button>
            
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-outline-success" type="button" onClick={() => window.location.href = "/register"}>
              Sign Up
            </button>
          </div>
        </div>
      </nav> */}

       
        <div className="d-flex justify-content-center  vh-300 w-500 mainLgn"  >
        <div className="bg-white p-2 rounded w-500 login inside">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} >
          

            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input type="text" placeholder="Enter Name" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                <strong>Password</strong>
              </label>
              <input type="text" placeholder="Enter Name" autoComplete="off" name="email" className="form-control rounded-0"  onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <button type="submit" className="btn btn-success w-100 rounded-0"> Login</button>
              <p>Don't Have an Account</p>
            </form>
            <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"> Sign Up</Link>
            
         
        </div>
      </div>
      </div>  
    );
}

export default Login;