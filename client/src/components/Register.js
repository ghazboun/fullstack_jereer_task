import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/auth';
import codes from '../data/codes';

const Register = () => {
  //Checking if user is logged for redirecting
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  //importing codes from file
  const CountryCodes = codes;

  //Maping codes in a select input
  const listcodes = CountryCodes.map((code) => (
    <option key={code.code} value={code.dial_code}>
      {code.name} {code.dial_code}
    </option>
  ));

  //Tracking formdata
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    countrycode: '+972',
  });

  //Destructring form data
  const { username, email, password, phone, countrycode } = formData;

  //On Change Listner
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //On Submit listner
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password, phone, countrycode }));
  };

  //Redirect if register success
  if (isAuthenticated) {
    return <Navigate to="/feed" />;
  }

  return (
    <div className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={(e) => onChange(e)}
          />
        </div>
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
        <div className="form-group">
          <select
            className="test"
            name="countrycode"
            onChange={(e) => onChange(e)}
            id="codes"
          >
            {listcodes}
          </select>

          <input
            type="number"
            placeholder="Phone Number"
            name="phone"
            minLength="10"
            value={phone}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default Register;

