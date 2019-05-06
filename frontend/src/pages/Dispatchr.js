import React, { Component } from "react";

export default class Dispatchr extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <>
        <nav>
          <ul>
            <li>Map</li>
            <li>Inbox</li>
            <li>Payments</li>
            <li>Profile</li>
          </ul>
        </nav>
        <main>
          <p>Welcome to Dispatchr</p>
        </main>
      </>
    )
  }
}
