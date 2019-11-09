import React, { Component } from 'react';
import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

class AdminPage extends Component {
  state = {
    loading: false,
    users: [],
    memesList:[],
    error:''
  };
  componentDidMount() {
    this.getUnpublicizedMemes();
  }
  getUnpublicizedMemes = ()=> {
    this.setState({ loading: true });
    this.props.firebase.memesFirestore().where("public", "==", false).get()
    .then((querySnapshot)=> {
      querySnapshot.forEach((doc)=> {
          this.setState({memesList:[...this.state.memesList, {id:doc.id, url:doc.data()} ]})
      });
      this.setState({loading:false})
  })
  .catch((error)=> {
      console.log("Error getting documents: ", error);
      this.setState({loading:false, error})
  });
  }
  makeImgPublic = (id) => {
    this.props.firebase.memesFirestore().doc(id).update({
      "public": true,
    })
    .then(()=> {
        console.log("Document successfully updated!")
        this.getUnpublicizedMemes();
    })
    .catch(err=> alert(err))
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }
  render() {
    return (
      <div>
        <h1 className="title">Admin</h1>
        <section>
        { 
          this.state.memesList.length > 0 ? <React.Fragment>
          <p className="title emoji-party" style={{marginLeft:30, fontWeight:'bold'}}>Latest added memes</p>
          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
            {this.state.memesList.map(doc => <img src={doc.url.url} alt={doc.url.title} key={doc.url.url} onClick={()=>this.makeImgPublic(doc.id)}/>)}
          </div>
          </React.Fragment> : <h3 className="title">Oops! no new memes!</h3>
        }
        </section>
      </div>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withFirebase,
  withAuthorization(condition),
)(AdminPage);
