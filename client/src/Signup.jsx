import { Link } from "react-router-dom";
import axios from 'axios'
import {useState} from "react"
import { useNavigate } from "react-router-dom";
import './Signup.css'


function Signup(){
  const[name,setName]=useState()
  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const navigate = useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/register',{name,email,password})
    .then(result=>{console.log(result)
      navigate('/login')
    })
    .catch(err=>console.log(err))
  }

    return (
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


        <div className="d-flex justify-content-center  vh-300 w-500 mainLgn">
          <div className="bg-white p-2 rounded w-500 login">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} >
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Name</strong>
                </label>
                <input type="text" placeholder="Enter Name" autoComplete="off" name="email" className="form-control rounded-0"  onChange={(e)=>setName(e.target.value)}/>
              </div>

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

              <button type="submit" className="btn btn-success w-100 rounded-0"> Register</button>
              <p>Already Have an Account</p>
              </form>
              <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"> Login</Link>
              
           
          </div>
        </div>

        </div>   
    );
}

export default Signup;