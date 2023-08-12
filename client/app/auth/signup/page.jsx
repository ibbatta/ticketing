"use client";

import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ email, password });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <div className="mb-3">
          <label className="form-label" htmlFor="input-email">
            Email Address
          </label>
          <input
            id="input-email"
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="input-password">
            Password
          </label>
          <input
            id="input-password"
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
