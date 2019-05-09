import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../../lib/User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      success
      message
    }
  }
`
const SignOutButton = props => (
  <Mutation refetchQueries={[{query: CURRENT_USER_QUERY}]} mutation={SIGN_OUT_MUTATION}>
    {(signout) => <button onClick={signout}>Sign Out</button>}
  </Mutation>
)

export default SignOutButton
