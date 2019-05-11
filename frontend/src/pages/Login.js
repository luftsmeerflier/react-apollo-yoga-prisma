import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/LoginForm'
import Error from '../components/pures/Error';
import { Loader } from '../components/pures/Loaders';
import { CURRENT_USER_QUERY } from '../lib/User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      username
      token
    }
  }
`;

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: null,
      loading: false
    }
  }
  handleChange = (e) => this.setState({[e.target.name]: e.target.value})
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              console.log('call signin()')
              const user = await signin();
              console.dir(user)
              this.setState({ name: '', email: '', password: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign into your account (<a href='/signup'>Sign up</a>)</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </label>

              <button type="submit">Sign In!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Login;
