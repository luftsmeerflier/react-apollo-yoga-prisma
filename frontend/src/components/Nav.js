import React from 'react';
import SignOutButton from './pures/SignOutButton';

const Nav = () => (
  <nav style={{position: 'fixed', top: 0, left: 0, height: '80px', width: '100vw'}}>
    <a style={{width: '100px', marginRight: '1em'}} href="/items">Missions</a>
    <a style={{width: '100px', marginRight: '1em'}} href="/sell">Inbox</a>
    <a style={{width: '100px', marginRight: '1em'}} href="/orders">Payments</a>
    <a style={{width: '100px', marginRight: '1em'}} href="/profile">Profile</a>
    <SignOutButton />
  </nav>
);

export default Nav;
