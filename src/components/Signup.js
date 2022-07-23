import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [Credentials, setCredentials] = useState({ name: "", email: "", password: "", checkpassword:"" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = Credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password })

    });
    const json = await response.json();
    console.log(json);
    if(json.success){
  //     // redirect
  
       localStorage.setItem('token', json.authtoken)
       navigate("/")
       props.showAlert("Account created successfully", "Success")
    }
    else{
      props.showAlert("invalid credentials", "danger")}
  }

  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Enter your Name here</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Enter your email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
          
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Enter your password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
        </div>

        <div className="mb-3">
          <label htmlFor="checkpassword" className="form-label">Re-enter your password</label>
          <input type="password" className="form-control" id="checkpassword" name="checkpassword" onChange={onChange} minLength={5} required/>
        </div>
        
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup