import app from 'firebase/app';
require('firebase/auth')
const env = require('./config.json')
const config = {
  apiKey: env.REACT_APP_API_KEY,
  authDomain: env.REACT_APP_AUTH_DOMAIN,
  databaseURL: env.REACT_APP_DATABASE_URL,
  projectId: env.REACT_APP_PROJECT_ID,
  storageBucket: env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
};
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  
  doSignInWithGoogle = ()=> {
    var provider = new app.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(provider)
  } 
  getProfilePicUrl = ()=> {
    return this.auth.currentUser.photoURL || '/images/profile_placeholder.png';
  }
  getUserName = () => {
    return this.auth.currentUser.displayName;
  }
  isUserSignedIn = ()=> {
    return !!this.auth.currentUser;
  }
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  initFirebaseAuth = (f)=> {
    return this.auth.onAuthStateChanged(e => f(e));
  }
}
export default Firebase;