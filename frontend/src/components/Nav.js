import React from 'react';
import { Link } from 'react-router-dom'
import SignOutButton from './pures/SignOutButton';
import StyledNav from '../styles/Nav'

const Nav = () => (
  <StyledNav style={{zIndex: 3, position: 'fixed', bottom: 0, left: 0, height: '80px', width: '100vw'}}>
    <Link style={{minWidth: '40px', marginRight: '0.5rem'}} to="/map">Map</Link>
    <Link style={{minWidth: '40px', marginRight: '0.5rem'}} to="/missions">Missions</Link>
    <Link style={{minWidth: '40px', marginRight: '0.5rem'}} to="/inbox">Inbox</Link>
    <Link style={{minWidth: '40px', marginRight: '0.5rem'}} to="/payments">Payments</Link>
    <Link style={{minWidth: '40px', marginRight: '0.5rem'}} to="/profile">Profile</Link>
  </StyledNav>
);

export default Nav;
