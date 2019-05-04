import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_MISSIONS = gql`
  {
    missions {
      title
      id
    }    
  }
`

export default class App extends Component {
  render () {
    return (
      <Query query={GET_MISSIONS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) {
            console.error(error)
            return (<div>Error :( <pre>{error.toString()}</pre></div>)
          }

          return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Welcome to Dispatchr on GraphQl
                </p>
                <ul>
                  {data.missions.map(m => (
                    <li>{m.title}</li>
                  ))}
                </ul>
              </header>
            </div>
          )
        }}
      </Query>
    );
  }
}
