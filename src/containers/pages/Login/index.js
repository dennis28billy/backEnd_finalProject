import React, { useState } from "react";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import firebase from "../../../config/Firebase";
import {useHistory} from 'react-router-dom';
import "../../../App.css";
import NavbarHeader from "../../../components/molecules/NavbarHeader";
import NavbarFooter from "../../../components/molecules/NavbarFooter";

const LoginFirebase = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleSubmit = () => {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
        history.push("/dashboardFirebase");
      })
    .catch((error) => {
        console.log("Error", error);
     });
    
  };

  return (

    <div>
      <NavbarHeader/>
      <div className="body">
          <div className="form-signin">
            <h3 className="text-center">Login</h3>
            <div className="form-floating mt-4">
            <Input
                type="email"
                className="form-control"
                label="Email"
                placeholder="Masukkan email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-floating">
            <Input
                type="password"
                className="form-control"
                label="Password"
                placeholder="Masukkan password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
              
              <br />
              <Button 
              type = "submit"
              onClick={handleSubmit} 
              text="Submit" 
              className="w-100 btn btn-md btn-primary"/>
        </div>
      </div>
      <NavbarFooter/>
    </div>
    
  );
};

export default LoginFirebase;