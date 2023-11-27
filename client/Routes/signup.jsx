import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Signup() {
  const Navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState("");

  const signupFormSize = {
    height: "30rem",
    paddingTop: "2rem",
  };

  function handleEmail(e) {
    setError("");
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setError("");
    setPassword(e.target.value);
  }

  function handleConfirmPass(e) {
    setError("");
    setConfirmPass(e.target.value);
  }

  function handleFullName(e) {
    setError("");
    setFullName(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password!=confirmPass){
      setError("Password didn't match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const URL = import.meta.env.VITE_SERVER_URL + "/signup";
      var thoughts = JSON.parse(localStorage.getItem("thoughts"));
      if(!thoughts)thoughts=[];
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          thoughts,
        }),
      });

      if (response.status==200) {
        const token = response.headers.get("Authorization").split(" ")[1];
        localStorage.setItem("token", token);
        const data = {
          thoughts: thoughts,
          email: email,
          fullName: fullName,
        };
        localStorage.setItem("user", data);
        setError("Success");
        Navigate("/");
      } else {
        const error=await response.json();
        console.log(error.message);
        setError(error.message);
      }
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-xl-5 col-lg-6 col-md-8 col-10">
            <div className="card border-dark justify-content-center">
              <form
                className="loginForm"
                onSubmit={handleSubmit}
                style={signupFormSize}
              >
                <div className="row justify-content-center">
                  <div className="col-8 m-2">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control border-secondary"
                      value={fullName}
                      onChange={handleFullName}
                      required
                    ></input>
                  </div>
                  <div className="col-8 m-2">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control border-secondary"
                      value={email}
                      onChange={handleEmail}
                      required
                    ></input>
                  </div>
                  <div className="col-8 m-2">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control border-secondary"
                      value={password}
                      onChange={handlePassword}
                      required
                    ></input>
                  </div>
                  <div className="col-8 m-2">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control border-secondary"
                      value={confirmPass}
                      onChange={handleConfirmPass}
                      required
                    ></input>
                  </div>
                  <div className="col-8 mt-2 mb-2 text-center">
                    {!loading && (
                      <button type="post" className="btn btn-dark w-100">
                        Signup
                      </button>
                    )}
                    {loading && (
                      <button
                        type="post"
                        className="btn btn-dark w-100 disabled"
                      >
                        <span
                          class="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>
                      </button>
                    )}
                    <br></br>
                    <div className="m-1">
                      Already have an account?{" "}
                      <a className="link-body-emphasis" href="/login">
                        Login
                      </a>
                    </div>
                    <div className="m-3">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
