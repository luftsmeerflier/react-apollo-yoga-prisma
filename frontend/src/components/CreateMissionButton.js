import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/LoginForm';
import Error from './pures/Error';

const CREATE_MISSION = gql`
  mutation CREATE_MISSION($title: String!, $description: String!, $bounty: Int!, $image: String, $postedBy: String!) {
    createMission(title: $title, description: $description, bounty: $bounty, image: $image, postedBy: $postedBy) {
      id
      title
    }
  }
`;

class CreateMissionButton extends Component {
  constructor(props) {
    super(props)
    console.dir(props)
    this.state = {
      title: '',
      bounty: '',
      description: '',
      image: 'someimg',
      loading: false,
      modalOpen: false,
      postedBy: props.user.id
    }
  }
  toggleCreateMissionModal = (e) => this.setState({modalOpen: !this.state.modalOpen})
  saveToState = e => this.setState({ [e.target.name]: e.target.name === 'bounty' ? Number(e.target.value) : e.target.value });
  uploadImage = async (e) => {
    let files = e.target.files
    const data = new FormData()
    data.append('file', files[0]).append('upload_preset', 'dispatchr')
    const response = await fetch(`https://api.cloudinary.com/v1_1/dispatchr/image/upload`, { method: 'POST', body: data })
    const file = await response.json()
    this.setState({ image: file.secure_url })
  }
  render() {
    console.log(this.state)
    return (
      <>
        <Mutation
          mutation={CREATE_MISSION}
          variables={this.state}
          refetchQueries={[{ query: this.props.GET_MISSIONS }]}
        >
          {(createMission, { error, loading }) => (
            <>
              <button onClick={this.toggleCreateMissionModal} style={{position: 'fixed', bottom: '120px', right: '20px', zIndex: 2}}>+</button>
              {this.state.modalOpen && (
                <Form
                  method="post"
                  onSubmit={async e => {
                    e.preventDefault();
                    await createMission();
                  }}
                  style={{
                    height: '100vh',
                    position: 'fixed',
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    backgroundColor: 'white'
                  }}
                >
                  <Error error={this.state.error} />
                  <div>
                    <fieldset style={{paddingRight: '3em'}} disabled={this.state.loading} aria-busy={this.state.loading}>
                      <h2>New Mission</h2>
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          name="title"
                          placeholder="Land on the moon"
                          value={this.state.title}
                          onChange={this.saveToState}
                        />
                      </label>
                      <label htmlFor="price">
                        Bounty
                        <input
                          type="number"
                          name="bounty"
                          placeholder="1,000,000"
                          value={this.state.bounty}
                          onChange={this.saveToState}
                        />
                      </label>
                      <label htmlFor="description">
                        Description
                        <input
                          type="text"
                          name="description"
                          placeholder="By any means necessary"
                          value={this.state.description}
                          onChange={this.saveToState}
                        />
                      </label>
                      <label htmlFor="file">
                        Image
                        <input
                          type="file"
                          name="file"
                          placeholder="Upload an image or pdf file"
                          onChange={this.uploadImage}
                        />
                      </label>


                      <button type="submit">Dispatch!</button>
                    </fieldset>
                  </div>
                </Form>
              )}
            </>
          )}
        </Mutation>
      </>
    );
  }

}

export default CreateMissionButton;
