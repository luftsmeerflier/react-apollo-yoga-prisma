import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_ACTIVE_MISSIONS = gql`
  {
    activeMissions {
      title
      id
    }
  }
`
class Missions extends Component {
  render() {
    return (
      <>
        <h1>Active Missions</h1>
        <Query query={GET_ACTIVE_MISSIONS}>
          {({ loading, error, data }) => {
            if (loading) return (<span>...</span>);
            if (error) {
              console.error(error)
              return (<div>Error :( <pre>{error.toString()}</pre></div>)
            }

            return (
              <ul>
                {data.activeMissions.length ? data.activeMissions.map(m => (
                  <li key={m.id}>{m.title}</li>
                )) : (<span>No Active missions for you</span>)}
              </ul>
            )
          }}
        </Query>
      </>
    );
  }

}

export default Missions;
