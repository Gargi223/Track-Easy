import React from "react";
import "./Home.css"; 
import { useNavigate } from "react-router-dom";

function Home() {

 
    const navigate = useNavigate();
  
    const handleLogout = () => {
      
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
  
      
      navigate("/login");
    };
  

  return (
    <div className="home-container">
   
   <div>
      <header className="header">
        <div className="logo">
          <a href="#">TrackEasy</a>
        </div>
        <nav>
          <a href="#about">About Us</a>
          <a href="#features">Features</a>
          <a href="#pricing"></a>
          <button className="btn btn-outline-success" type="button" onClick={() => (window.location.href = "/")}>
              Log Out
            </button>
        </nav>
       
      </header>

      <section className="hero">
        <h1>Track your daily tasks and Expenses Seamlessly</h1>
        <p>
          Back up any file or folder. A wide range of files saved in cloud
          storage. Access your files from multiple devices.
        </p>
        <div className="buttons">
          <a href="#download" className="btn-download">Get Started</a>
          
        </div>
      </section>

      <section className="features">
        <div>
          <h3>Easy to Track Daily Tasks</h3>
          <p>
            Keep track on the important tasks you need to be done.
          </p>
          <button className="btn btn-outline-success" type="button" onClick={() => (window.location.href = "/task")}>
              Add a Task
            </button>
        </div>
        <div>
          <h3>Better Daily Expense Handling</h3>
          <p>
            Track your daily expenses with ease and lkszscnmx,
          </p>
          <button
              className="btn btn-outline-success"
              type="button"
              onClick={() => (window.location.href = "/expense")}
            >
              Add Expenditure
            </button>
        </div>
        <div>
          <h3>Keep Updated With overall Expenses </h3>
          <p>You can view summary of your expenses Month, Day and Week wise </p>
          <button className="btn btn-outline-success" type="button" onClick={() => (window.location.href = "/summary")}>
              View Expense Summary
            </button>
        </div>
      </section>
    </div>
    
     
    </div>
  );
}

export default Home;
