import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import SignOutButton from '../components/App/SignOut';
import { AuthUserContext } from '../components/Session';
import './index.css';
import SearchBar from './../components/App/SearchBar';

const Navigation = (props)=> {
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? <NavigationAuth handleChange={props.handleChange} text={props.text} memesList={props.memesList}
            handleKeyDown={props.handleKeyDown}/>
             : <NavigationNonAuth handleChange={props.handleChange} text={props.text} memesList={props.memesList}
             handleKeyDown={props.handleKeyDown}/>
          }
        </AuthUserContext.Consumer>
      </div>
    )
};

const NavigationAuth = (props) => {
  return  ( 
  <ul>
    {/* <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li> */}
    <div style={{display:'flex',flexDirection:'row'}}>
      <li>
        <Link to={ROUTES.HOME}>Memehub</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Profile</Link>
      </li>
    </div>

    {/* <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li> */}
    <div style={{display:'flex',flexDirection:'row'}}>
      <Link to={ROUTES.SearchPage} className="a">
        <SearchBar handleChange={props.handleChange} text={props.text} memesList={props.memesList}
           handleKeyDown={props.handleKeyDown}/>
      </Link>
      <SignOutButton />
    </div>

  </ul>
)}

const NavigationNonAuth = (props) => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Memehub</Link>
    </li>
    <li style={{display:'flex', flexDirection:'row'}}>
      <Link to={ROUTES.SearchPage} className="a">
        <SearchBar handleChange={props.handleChange} text={props.text} memesList={props.memesList}
           handleKeyDown={props.handleKeyDown}/>
      </Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Log in</Link>

    </li>
  </ul>
);

export default Navigation;