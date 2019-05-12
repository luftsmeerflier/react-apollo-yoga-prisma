import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../styles/LoginForm';
import Error from './pures/Error';
import { Dialog, IconButton } from 'evergreen-ui';

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
    return (
      <>
        <Mutation
          mutation={CREATE_MISSION}
          variables={this.state}
          refetchQueries={[{ query: this.props.GET_MISSIONS }]}
        >
          {(createMission, { error, loading }) => (
            <>
              <IconButton
                onClick={this.toggleCreateMissionModal}
                className='createMissionButton'
                icon='plus'
                height={40}
                appearance='primary'
                intent='success'
              />
              <Dialog
                isShown={this.state.modalOpen}
                title='Create a mission'
                hasFooter={false}
                hasHeader={false}
                style={{margin: 0, padding: 0}}
                topOffset={0}
                sideOffset={0}
              >
                <Form
                  className='createMissionForm'
                  method='post'
                  onSubmit={async e => {
                    e.preventDefault();
                    await createMission();
                  }}
                >
                  <Error error={this.state.error} />
                  <div>
                    <fieldset disabled={this.state.loading} aria-busy={this.state.loading}>
                      <h2>
                        New Mission
                        <IconButton
                          icon='cross'
                          className='close'
                          onClick={() => this.toggleCreateMissionModal()}
                          type='button'
                          intent='success'
                          style={{marginTop: '0.5rem', float: 'right'}}
                        />
                      </h2>
                      <label htmlFor='title'>
                        Title
                        <input
                          type='text'
                          name='title'
                          placeholder='Land on the Moon'
                          value={this.state.title}
                          onChange={this.saveToState}
                        />
                      </label>
                      <label htmlFor='price'>
                        Bounty
                        <input
                          type='number'
                          name='bounty'
                          placeholder='1,000,000'
                          value={this.state.bounty}
                          onChange={this.saveToState}
                        />
                      </label>
                      <label htmlFor='description'>
                        Description
                        <input
                          type='text'
                          name='description'
                          placeholder='By any means necessary'
                          value={this.state.description}
                          onChange={this.saveToState}
                        />
                      </label>
                      <label htmlFor='file'>
                        Image
                        <input
                          type='file'
                          name='file'
                          placeholder='Upload an image or pdf file'
                          onChange={this.uploadImage}
                        />
                      </label>


                      <button type='submit'>Dispatch!</button>
                    </fieldset>
                  </div>
                </Form>
              </Dialog>
            </>
          )}
        </Mutation>
      </>
    );
  }

}

export default CreateMissionButton;
