import React from 'react';
import { Link } from 'react-router-dom';
import { Pane, Icon } from 'evergreen-ui'

const Nav = () => (
  <Pane
    height={80}
    width="100vw"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    border="none"
    paddingX={40}
    backgroundColor='whitesmoke'
    style={{zIndex: 3, position: "fixed", bottom: 0, left: 0, textAlign: 'center', fontSize: '1rem', textDecoration: 'none' }}>
    <Link className='navLnk' to='/map'>
      <Icon size={25} icon='map' />
      <div className='navTxt'>Map</div>
    </Link>
    <Link className='navLnk' to='/missions'>
      <Icon size={25} icon='list' />
      <div className='navTxt'>Missions</div>
    </Link>
    <Link className='navLnk' to='/inbox'>
      <Icon size={25} icon='chat' />
      <div className='navTxt'>Inbox</div>
    </Link>
    <Link className='navLnk' to='/payments'>
      <Icon size={25} icon='dollar' />
      <div className='navTxt'>Payments</div>
    </Link>
    <Link className='navLnk' to='/profile'>
      <Icon size={25} icon='user' />
      <div className='navTxt'>Profile</div>
    </Link>
  </Pane>
);

export default Nav;
