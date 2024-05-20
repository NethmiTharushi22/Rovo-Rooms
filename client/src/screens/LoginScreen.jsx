import { React, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function LoginScreen() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  async function Login() {
    setloading(true);
      const user ={
        email,
        password,
      }
      
    try {
      setloading(true);
      const result = (await axios.post("api/users/login", user)).data
      
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = '/home';
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(error);
      console.log(error);
    }
  }
  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message="invalid credentials" />}
          <div className="bs">
            <h2>Login</h2>
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <button className="btn btn-primary mt-3" onClick={Login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginScreen;