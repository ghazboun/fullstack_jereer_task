import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/auth';

const Login = () => {
  //Check if use is logged in
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  //Tracking change in form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //Destructuring form data
  const { email, password } = formData;

  //On Change Listner
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    //On Submit Listner
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  //REdirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/feed" />;
  }
  return (
    <div className='container'>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Sign In" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};
export default Login;
