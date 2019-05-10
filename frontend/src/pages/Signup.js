import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/LoginForm'
import Error from '../components/pures/Error';
import { Loader } from '../components/pures/Loaders';
import { CURRENT_USER_QUERY } from '../lib/User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $username: String!, $password: String!, $avatar: String!) {
    signup(email: $email, username: $username, password: $password, avatar: $avatar) {
      id
      email
      username
      avatar
    }
  }
`;

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    avatar: ''
  };
  saveToState = e => this.setState({ [e.target.name]: e.target.value });
  uploadImage = async (e) => {
    console.log('uploading file')
    let files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'dispatchr')
    const response = await fetch(`https://api.cloudinary.com/v1_1/dispatchr/image/upload`, {
      method: 'POST',
      body: data
    })
    const file = await response.json()
    console.dir(file)
    this.setState({ avatar: file.secure_url })
  }
  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({ username: '', email: '', password: '', avatar: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for An Account (<a href="/login">Login</a>)</h2>
              {this.state.avatar && (<img alt="avatar preview" src={this.state.avatar} />)}
              <label htmlFor="file">
                Avatar
                <input
                  type="file"
                  name="file"
                  placeholder="Upload your avatar"
                  onChange={this.uploadImage}
                />
              </label>

              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="username">
                Agent name
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={this.state.username}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>

              <button type="submit">Sign Up!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };
