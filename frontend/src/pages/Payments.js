import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_PAYMENTS = gql`
  {
    payments {
      id
      amount
      datePaid
      Payee {
        username
        avatar
      }
      mission {
        title
      }
    }
  }
`

class Payments extends Component {
  render() {
    return (
      <>
        <h1>Payments</h1>
        <Query query={GET_PAYMENTS}>
          {({ loading, error, data }) => {
            if (loading) return (<span>...</span>);
            if (error) {
              console.error(error)
              return (<div>Error :( <pre>{error.toString()}</pre></div>)
            }

            return (
              <ul>
                {data.payments.length ? data.payments.map(m => (
                  <li key={m.id}>{m.Payee.username} paid: {m.amount} on {m.datePaid} for {m.mission.title}</li>
                )) : (<span>No Payments, get busy buster</span>)}
              </ul>
            )
          }}
        </Query>
      </>
    );
  }

}

export default Payments;
