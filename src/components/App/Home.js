import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import ImageUpload from './../ImageUpload';

class HomePage extends Component {
  componentDidMount() {
    this.props.firebase.memesFirestore().where("public", "==", true).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <ImageUpload authUser={this.props.authUser}/>
      </div>
    );
  }
} 

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);