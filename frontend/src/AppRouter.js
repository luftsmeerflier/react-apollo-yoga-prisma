import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Landing } from './pages/Landing.js';
import Login from './pages/Login.js';
import Dispatchr from './pages/Dispatchr.js';
import SignUp from './pages/Signup';
import Map from './components/Map';
import Nav from './components/Nav';
import User from './lib/User';
// import Activate from './pages/Activate.js';
// import Application from './Application';
import './App.css';
const AppComponent = ({ component: Component, props, user }) => (
  <>
    <Nav user={user} />
    <Component user={user} {...props} />
  </>
)

const PrivRoute = ({ component: Component, ...rest }) => {
  return (
    <User>
      {({loading, error, data}) => loading ? (<span>loading...</span>) :
        error ? ((<span>Error: {error.toString()}</span>)) :
        data.me ? (<AppComponent component={Component} props={rest} user={data.me} />) :
        (<Redirect to={{pathname: '/login'}} />)
      }
    </User>
  )
}
const CheckLoginRoute = ({ component: Component, ...rest }) => {
  return (
    <User>
      {({loading, error, data}) => {
        if (loading) {
          return (<span>loading...</span>)
        }
        if (error) {
          return (<span>Error! {error.toString()}</span>)
        }
        if (data) { return data.me ? (<Redirect to={{pathname: '/map', state: { from: 'login' }}} />) : <Login /> }
      }}
    </User>
  )
}

export const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Landing} />
      <CheckLoginRoute exact path='/login' component={Login} />
      <CheckLoginRoute exact path='/signup' component={SignUp} />
      {/* <Route exact path='/activate/:email' component={Activate} /> */}
      {/* <PrivateRoute path='/application' component={Application} /> */}
      <PrivRoute exact path='/map' component={Map} />
      <PrivRoute exact path='/inbox' component={Dispatchr} />
      <PrivRoute exact path='/payments' component={Dispatchr} />
      <PrivRoute exact path='/profile' component={Dispatchr} />
      <PrivRoute exact path='/settings' component={Dispatchr} />
      {/* <PrivateRoute path='/map' component={Dispatchr} />
        <PrivateRoute path='/inbox' component={Dispatchr} />
        <PrivateRoute path='/payments' component={Dispatchr} />
        <PrivateRoute path='/profile' component={Dispatchr} />
      <PrivateRoute path='/settings' component={Dispatchr} /> */}
    </Switch>
  </Router>
)
