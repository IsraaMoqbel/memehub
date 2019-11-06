import React, { Component } from 'react';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';

class  AccountPage extends Component {
  componentDidMount() {
    this.props.firebase.memesFirestore().where("userId", "==", this.props.authUser.uid).get()
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
      <AuthUserContext.Consumer>
        {authUser => {
          return (
            <div>
              <h1>Account: {authUser.email}</h1>
              <PasswordForgetForm />
              <PasswordChangeForm />
            </div>
          )}}
      </AuthUserContext.Consumer>
    )
  }
} 

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);