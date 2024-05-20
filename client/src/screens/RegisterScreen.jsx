import { React, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Sucess from "../components/Success";


function RegisterScreen() {
 const [name, setname] =useState();
 const [loading,setloading] = useState();
 const [error, seterror] = useState();
 const [email, setemail] = useState();
 const [password, setpassword] = useState();
 const [cpassword, setcpassword] = useState();
 const [success, setsuccess] = useState(false);

  async function Register()
{
    if(password === cpassword){
        setloading(true);
        const user ={
            name,
            email,
            password,
        }
        try {
            setloading(true);
           await axios.post("api/users/register", user).then((res)=>{
                if(res.data){
                    localStorage.setItem("currentUser", JSON.stringify(res.data));
                }
               
            });
           
           setsuccess(true);
            setloading(false);
            setname("")
            setemail("")
            setpassword("")
            setcpassword("")
        } catch (error) {
            setloading(false);
            seterror(error);
            console.log(error);
        }
    }else{
            console.log("password is not matching")
    }
    }
    return(
        <div>
            {loading && <Loader />}
            {error && <Error />}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {success && <Sucess message="Registraion Success" />}
                
                <div className="bs">
                    <h2>Register</h2>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="name"
                        value={name}
                        onChange={(e) => {
                            setname(e.target.value);
                        }}
                    />
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
                    <input
                        type="password"
                        className="form-control"
                        placeholder="confirm password"
                        value={cpassword}
                        onChange={(e) => {
                            setcpassword(e.target.value);
                        }}
                    />
                    <p>
                        Already have an account? <a href="/login">Login</a>
                    </p>
                    <button className="btn btn-primary mt-3" onClick={Register}>Register</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default RegisterScreen;