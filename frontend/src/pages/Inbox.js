import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_INBOX = gql`
  {
    messages {
      id
      body
      from {
        avatar
        username
      }
    }
  }
`
class Inbox extends Component {
  render() {
    return (
      <>
        <h1>Inbox</h1>
        <Query query={GET_INBOX}>
          {({ loading, error, data }) => {
            if (loading) return (<span>...</span>);
            if (error) {
              console.error(error)
              return (<div>Error <pre>{error.toString()}</pre></div>)
            }

            return (
              <ul>
                {data.messages.length ? data.messages.map(m => (
                  <li key={m.id}>{m.from.username} says: {m.body}</li>
                )) : (<span>No Messages</span>)}
              </ul>
            )
          }}
        </Query>
      </>
    );
  }
}
        export default Inbox;
