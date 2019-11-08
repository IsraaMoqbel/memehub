import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Landing from './Landing';
import Modal from './Modal';
import ImageUpload from './../ImageUpload';
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';

class HomePage extends Component {
  state ={
    memesList:[],
    showModal:false,
    editMode:false,
    loading:true
  }
  componentDidMount() {
    this.props.firebase.memesFirestore().where("public", "==", true).orderBy("timeUploded", "desc").get()
    .then((querySnapshot)=> {
      querySnapshot.forEach(doc=> {
        this.setState({memesList:[...this.state.memesList, doc.data()]})
      })
      this.setState({loading:false})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        this.setState({loading:false})
    });
  }
  toggle = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }
  render() {
    return (
      <div>
        <Landing />
        <button onClick={()=>this.toggle()} className="add-btn">Add a new meme</button>
        {this.state.showModal && 
          <Modal 
          modalComponent={<ImageUpload authUser={this.props.authUser}/>}
          authUser={this.props.authUser}
          toggle={this.toggle}/>
        }
        <section>
        { this.state.loading ? <Dots /> :
          this.state.memesList.length > 0 ? <React.Fragment>
          <p className="title emoji-party" style={{marginLeft:30, fontWeight:'bold'}}>Latest added memes</p>
          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
            {this.state.memesList.map(doc => <img src={doc.url} alt={doc.title} key={doc.timeUploded}/>)}
          </div>
          </React.Fragment> : <h3 className="title">Oops! error getting memes!</h3>
        }
        </section>
        <div style={{position:'relative', display:'flex', justifyContent:'space-around',borderTop:"solid", borderTopColor:'wheat', borderTopWidth:'1px'}}>
          <p className="title">All copy rights reserved <i className="fa fa-copyright"/></p>
          <p className="title">Made with <i className="fa fa-heart"/></p>

        </div>
      </div>
    );
  }
} 

export default withFirebase(HomePage);