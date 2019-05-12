import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Landing } from './pages/Landing.js';
import Login from './pages/Login.js';
import SignUp from './pages/Signup';
import Map from './pages/Map';
import Missions from './pages/Missions';
import Inbox from './pages/Inbox';
import Payments from './pages/Payments';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Nav from './components/Nav';
import User from './lib/User';
import { MapLoader } from './components/pures/Loaders';
import './App.css';

// import Activate from './pages/Activate.js';
// import Application from './Application';

const PropsRoute = ({ component: Component, ...rest }) => <Component component={Component} {...rest} />

const App = (props) => {
  console.log('App')
  return (
    <Router>
      <Switch>
        <PropsRoute exact user={props.user} path='/map' component={Map} />
        <PropsRoute exact user={props.user} path='/missions' component={Missions} />
        <PropsRoute exact user={props.user} path='/inbox' component={Inbox} />
        <PropsRoute exact user={props.user} path='/payments' component={Payments} />
        <PropsRoute exact user={props.user} path='/profile' component={Profile} />
        <PropsRoute exact user={props.user} path='/settings' component={Settings} />
        {/* <Redirect to='/map' /> */}
        <Route exact user={props.user} render={props => {
          console.log('using render method for App')
          setTimeout(function () {
            props.history.replace('/map')
          }, 3000)
          return <MapLoader />
        }} />
      </Switch>
      <Nav />
    </Router>
  )
}

const Public = () => {
  console.log('Public component')
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/' component={Landing} />
        <Redirect to='/' />
      </Switch>
    </Router>
  )
}

const RenderApplication = () => (
  <User>
    {({loading, error, data}) => loading ? null : error ? ((<span>Error: {error.toString()}</span>)) : data.me ? <App user={data.me} /> : <Public />}
  </User>
)

export const AppRouter = () => (<RenderApplication />)
