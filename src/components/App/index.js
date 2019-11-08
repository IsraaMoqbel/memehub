import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation from '../../Navigation';
import LandingPage from './Landing';
import SearchPage from './SearchPage';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import AdminPage from './Admin';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import './index.css';

class App extends React.Component {
  state = {
    text:'',
    memesList:[]
  }
  handleChange = (e)=> {
    this.setState({text:e.target.value});
  }
  handleKeyDown = (memesList) => {
    this.setState({memesList});
  }

  render() {
    return(
      <Router>
        <div className='App'>
          <Navigation handleChange={this.handleChange}
           text={this.state.text}
           memesList={this.state.memesList}
           handleKeyDown={this.handleKeyDown}/>
          <Route  path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route
            path={ROUTES.SearchPage}
            component={() => <SearchPage text={this.state.text} memesList={this.state.memesList} />}/>
        </div>
      </Router>
    );
  }
} 


export default withAuthentication(App);
