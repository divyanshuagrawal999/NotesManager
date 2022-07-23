import React,{ useState }  from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [Credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: Credentials.email, password: Credentials.password })

    });
    const json = await response.json();
    console.log(json);
    if(json.success){
  //     // redirect
       localStorage.setItem('token', json.authtoken)
      navigate("/")
      props.showAlert("logged in successfully", "success")
    }
    else{
      props.showAlert("invalid credentials", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>


      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Enter your email address</label>
          <input type="email" value={Credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Enter your Password</label>
          <input type="password" value={Credentials.password} className="form-control" id="password" name="password" onChange={onChange}/>
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>

      </form>


    </div>
  )
}

export default Login