import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

//redux
import { Provider } from 'react-redux';
import store from './store';
import Feed from './components/Feed';

//Checking local storage for token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

//Loading user if token is availible on each render of app
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    //Providing Redux Store
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route
              exact
              path="/feed"
              element={<PrivateRoute component={Feed} />}
            />{' '}
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
