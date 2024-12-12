import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./LoginPopup.css";
import { useState, useContext } from "react";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login");
  
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const onChangeHandler = (evt) => {
 
    const fieldName = evt.target.name;
    const fieldValue = evt.target.value;
    setData((prevData) => ({...prevData, [fieldName]: fieldValue}));
  }

  const onLogin = async(evt) => {
    evt.preventDefault();
    let userEndpoint = url;
    if(currState === "Login"){
      userEndpoint += "/api/user/login"
    }else{
      userEndpoint += "/api/user/register";
    }


    const response = await axios.post(userEndpoint, data);

    if(response.data.success){
      setToken(response.data.token);
      //we are saving the JWT token in Local Storage, this is available to the cliet side only, to send the token to backend server, use headers
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    }else{
      alert(response.data.message);
    }
  } 

  return (
    <div className="login-popup">
      <form onSubmit={onLogin}className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Your name" required />
          )}
          <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Your email" required />
          <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Your password" required />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms and conditions.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}> Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}> Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
