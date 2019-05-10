import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import CreateMissionButton from './CreateMissionButton'
import { MapLoader } from './pures/Loaders';

const GET_MISSIONS = gql`
  {
    missions {
      title
      id
    }
  }
`

export default class Map extends Component {
  render () {
    return (
      <Query query={GET_MISSIONS}>
        {({ loading, error, data }) => {
          if (loading) return (<MapLoader />);
          if (error) {
            console.error(error)
            return (<div>Error :( <pre>{error.toString()}</pre></div>)
          }

          return (
            <div className="App">
              <header className="App-header">
                <p>Hi {this.props.user.username || 'friend'}</p>
                <p>
                  Welcome to Dispatchr
                </p>
                <main>
                  <ul>
                    {data.missions.map(m => (
                      <li>{m.title}</li>
                    ))}
                  </ul>
                  <CreateMissionButton user={this.props.user} GET_MISSIONS={GET_MISSIONS}/>
                </main>
              </header>
            </div>
          )
        }}
      </Query>
    );
  }
}
