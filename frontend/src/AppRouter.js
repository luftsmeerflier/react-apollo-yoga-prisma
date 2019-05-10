import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Landing } from './pages/Landing.js';
import Login from './pages/Login.js';
import SignUp from './pages/Signup';
import Missions from './pages/Missions';
import Inbox from './pages/Inbox';
import Payments from './pages/Payments';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Map from './components/Map';
import Nav from './components/Nav';
import User from './lib/User';
import { MapLoader } from './components/pures/Loaders';
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
  console.log('privroute')
  return (
    <User>
      {({loading, error, data}) => loading ? null :
        error ? ((<span>Error: {error.toString()}</span>)) :
        data.me ? (<AppComponent component={Component} props={rest} user={data.me} />) :
        (<Redirect to={{pathname: '/login'}} />)
      }
    </User>
  )
}
const CheckLoginRoute = ({ component: Component, ...rest }) => {
  console.log('CheckLoginRoute')
  return (
    <User>
      {({loading, error, data}) => {
        if (loading) { return (<span>loading...</span>) }
        if (error) { return (<span>Error! {error.toString()}</span>) }
        if (data) {
          return data.me ?
            (<Redirect to={{pathname: '/map', state: { from: 'login' }}} />) :
          rest.location.pathname === '/signup' ? <SignUp /> : <Login />
        }
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
      <PrivRoute exact path='/missions' component={Missions} />
      <PrivRoute exact path='/inbox' component={Inbox} />
      <PrivRoute exact path='/payments' component={Payments} />
      <PrivRoute exact path='/profile' component={Profile} />
      <PrivRoute exact path='/settings' component={Settings} />
      {/* <PrivateRoute path='/map' component={Dispatchr} />
        <PrivateRoute path='/inbox' component={Dispatchr} />
        <PrivateRoute path='/payments' component={Dispatchr} />
        <PrivateRoute path='/profile' component={Dispatchr} />
      <PrivateRoute path='/settings' component={Dispatchr} /> */}
    </Switch>
  </Router>
)
