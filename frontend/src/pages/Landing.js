import React from 'react';
const Logo = require('../img/logo_withText.png')

export const Landing = () => (
  <>
    <nav style={{float: 'right'}}>
      <a href='/login'>Login</a>
      <a href='/signup'>SignUp</a>
    </nav>
    <h1>The most fire app ever</h1>
    <img style={{maxWidth: '100px'}} src={Logo} alt='Dispatchr Logo with text' />
  </>
)
