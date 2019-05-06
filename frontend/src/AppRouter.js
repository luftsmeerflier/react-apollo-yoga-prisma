import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import auth from './lib/auth.js'
import { Landing } from './pages/Landing.js'
import Login from './pages/Login.js'
import Dispatchr from './pages/Dispatchr.js'
import SignUp from './pages/Signup'
// import Activate from './pages/Activate.js';
// import Application from './Application';
import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      auth.getToken() !== null ? <Component {...props} /> :
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )} />
  )
}

export const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/logout' component={Login} />
      {/* <Route exact path='/activate/:email' component={Activate} /> */}
      {/* <PrivateRoute path='/application' component={Application} /> */}
      <PrivateRoute path='/map' component={Dispatchr} />
      <PrivateRoute path='/inbox' component={Dispatchr} />
      <PrivateRoute path='/payments' component={Dispatchr} />
      <PrivateRoute path='/profile' component={Dispatchr} />
      <PrivateRoute path='/settings' component={Dispatchr} />
    </Switch>
  </Router>
)
