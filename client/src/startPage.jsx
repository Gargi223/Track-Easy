import './startPage.css';

export default function StartPage(){
    return(

        <div className="start">

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

            
            <div className='intro'>
            <h1>Welcome to Your Personal Tracker!</h1>
            <br />
            <p>Stay organized and in control with our easy-to-use platform. Manage your expenses, track tasks, and get a clear summary of your financial activity—all in one place. Whether you're budgeting for the month, keeping an eye on your to-do list, or reviewing your spending habits, we've got you covered.</p>
            <br /><br />

            <h4>Sign in to start organizing your life and finances today!</h4>
            <button className="btn btn-outline-success" type="button"  onClick={() => window.location.href = "/login"}>
              Login / Sign up
            </button>
            
            </div>
            
            
            
            
            

        </div>

    );

}