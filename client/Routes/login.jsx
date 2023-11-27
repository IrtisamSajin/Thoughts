import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Login() {
  const Navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  const LoginCardStyle = {
    height: "27rem",
    paddingTop: "5rem",
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const URL = import.meta.env.VITE_SERVER_URL + "/login";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = response.headers.get("Authorization").split(" ")[1];
        localStorage.setItem("token", token);
        const data = await response.json(); //data => thoughts,email,displayName,fullName
        localStorage.setItem("thoughts", JSON.stringify(data.thoughts));
        setError("Success");
        Navigate("/");
      } else {
        setError("Authentication Failed");
      }
    } catch (err) {
      setError("Authentication Failed");
      console.log(err);
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
                onSubmit={handleLoginSubmit}
                style={LoginCardStyle}
              >
                <div className="row justify-content-center">
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
                  <div className="col-8 m-2 text-center">
                    {!loading && (
                      <button type="post" className="btn btn-dark w-100">
                        Login
                      </button>
                    )}
                    {loading && (
                      <button
                        type="post"
                        className="btn btn-dark w-100 disabled"
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>
                      </button>
                    )}
                    <br></br>
                    <div className="m-1">
                      Don't have an account?{" "}
                      <a className="link-body-emphasis" href="/signup">
                        Signup
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
