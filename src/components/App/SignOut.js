import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut} className="signout tooltip">
      <span className="tooltiptext">Log out</span>
  </button>
);

export default withFirebase(SignOutButton);