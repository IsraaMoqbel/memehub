import React, { Component } from 'react';
import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
// add search input by keyword in home page, landing page, & account page
// style the whole thing
// add feature for making new memes public
// style meme card 
class AdminPage extends Component {
  state = {
    loading: false,
    users: [],
  };
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.memesFirestore().where("public", "==", false).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

  this.props.firebase.users().on('value', snapshot => {
    const usersObject = snapshot.val();
    const usersList = Object.keys(usersObject).map(key => ({
      ...usersObject[key],
      uid: key,
    }));
    this.setState({
      users: usersList,
      loading: false,
    });
  });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }
  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.length>0 ? users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    )): <h3>No users yet!</h3>}
  </ul>
);
const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withFirebase,
  withAuthorization(condition),
)(AdminPage);
