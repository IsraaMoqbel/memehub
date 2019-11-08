import React, { Component } from 'react';
import PasswordChangeForm from './PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import Modal from './Modal';
import ImageUpload from './../ImageUpload';
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';

class AccountPage extends Component {
  state = {
    memesList:[],
    showModal:false,
    changePassword: false,
    loading: true,
    error:''
  }
  getUserMemes= () => {
    this.props.firebase.memesFirestore().where("userId", "==", this.props.authUser.uid).orderBy("timeUploded", "desc").get()
    .then((querySnapshot)=> {
      querySnapshot.forEach((doc)=> {
          this.setState({memesList:[...this.state.memesList, doc.data()]})
      });
      this.setState({loading:false})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        this.setState({loading:false,error})
    });
  }
  componentDidMount() {
    this.getUserMemes();
  }
  toggle = () => {
    this.setState({
      showModal: !this.state.showModal
    }, ()=> {
      this.setState({memesList:[]})
      !this.state.showModal && this.getUserMemes();
    })
  }
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => {
          return (
            <div>
              <h3 className="title">Account: {authUser.email}</h3>
              {this.state.changePassword && <PasswordChangeForm />}

              <div>
                <button onClick={()=>this.toggle()} className="add-btn">Add a new meme</button>
                {this.state.showModal && 
                  <Modal 
                  modalComponent={<ImageUpload authUser={authUser}/>}
                  authUser={authUser}
                  toggle={this.toggle}/>
                }
                <section style={{margin:'60px'}}>
                    { this.state.loading ? <Dots /> :
                      this.state.memesList.length > 0 ? <React.Fragment>
                      <p className="title" style={{ marginLeft:30, fontWeight:'bold'}}>Latest added memes</p>
                      {this.state.memesList.map(doc => <img src={doc.url} alt={doc.title} key={doc.timeUploded}/>)}
                      </React.Fragment> : <h3 className="title">Oops! no memes yet! {this.state.error}</h3>
                    }
                </section>
                <div style={{position:'relative', display:'flex', justifyContent:'space-around',borderTop:"solid", borderTopColor:'wheat', borderTopWidth:'1px'}}>
                  <button onClick={()=>this.setState({changePassword: !this.state.changePassword, forgotPassword:false})} className="btn">Change Password</button>
                </div>
              </div>
            </div>
          )}}
      </AuthUserContext.Consumer>
    )
  }
} 

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);