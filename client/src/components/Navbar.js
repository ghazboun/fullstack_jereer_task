import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = () => {
  //Cheking if user is logged in
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  //Dispatching signout action
  const signOut = () => {
    dispatch(logout());
  };

  //Link to show if use is logged in
  const authLinks = (
    <ul>
      <li>
        <Link to="/feed">
          <i /> <span>Feed</span>
        </Link>
      </li>
      <li>
        <a onClick={signOut} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  //Links to show if use is not logged in
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-comments" /> Social Feed
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

export default Navbar;
