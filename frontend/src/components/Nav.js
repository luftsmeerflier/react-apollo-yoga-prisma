import React from 'react';
import SignOutButton from './pures/SignOutButton';
import StyledNav from '../styles/Nav'

const Nav = () => (
  <StyledNav style={{zIndex: 3, position: 'fixed', bottom: 0, left: 0, height: '80px', width: '100vw'}}>
    <a style={{minWidth: '80px', marginRight: '1rem'}} href="/missions">Missions</a>
    <a style={{minWidth: '80px', marginRight: '1rem'}} href="/inbox">Inbox</a>
    <a style={{minWidth: '80px', marginRight: '1rem'}} href="/payments">Payments</a>
    <a style={{minWidth: '80px', marginRight: '1rem'}} href="/profile">Profile</a>
  </StyledNav>
);

export default Nav;
