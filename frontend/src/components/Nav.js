import React from 'react';
import { Link } from 'react-router-dom';
import StyledNav from '../styles/Nav';
import { Pane, Text } from 'evergreen-ui'

const Nav = () => (
  <Pane
    height={80}
    width="100vw"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    border="default"
    paddingX={12}
    style={{zIndex: 3, position: "fixed", bottom: 0, left: 0 }}>
    <Link to='/map'>Map</Link>
    <Link to='/missions'>Missions</Link>
    <Link to='/inbox'>Inbox</Link>
    <Link to='/payments'>Payments</Link>
    <Link to='/profile'>Profile</Link>
  </Pane>
);

export default Nav;
