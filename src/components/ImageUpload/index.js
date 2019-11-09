import React, { Component } from "react";
import { withFirebase } from '../Firebase';

class ImageUpload extends Component {
  state = {
    image: null,
    url: "",
    progress: 0,
    keywords:'',
    title:''
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image, keywords, title } = this.state;
    const uploadTask = this.props.firebase.addToStorage(image.name).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log(snapshot)
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        this.props.firebase.accessStorage()
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
            this.props.firebase.memesFirestore()
            .add({
              title,
              url,
              keywords: keywords.split(" "),
              public:false,
              timeUploded: Date.now(),
              userId: (this.props.authUser && this.props.authUser.uid) || null
            });
          })
          .then(()=> {
            this.setState({image: null,
              progress: 0,
              keywords:'',
              title:''})
          })
          .catch(e=>alert(e,'something is wrong!!!'))
      }
    );
  };
  render() {
    return (
      <div className="center">
          <br/>
          <h2 className="green">Upload a new meme</h2>
          <p className="PS1">PS: uploaded meme will not appear immediately in the main page cuz we have to make sure it's really funny!
          </p>
          <p className="PS2">
           But you can still find it in the search results and it will be in your account page if you are signed in!
          </p>
        <br />
        <div className="file-field input-field">
          <label className="custom-file-upload validate">
            <input type="file" onChange={this.handleChange}/>
            Upload image
          </label>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" value={this.state.title} placeholder="Title" name="title" onChange={(e)=> this.onChange(e)}/>
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" value={this.state.keywords} placeholder="keywords" name="keywords" onChange={(e)=> this.onChange(e)}/>
          </div>

        </div>
        <button
          onClick={this.handleUpload}
          className="waves-effect waves-light btn"
        >
          Upload
        </button>
        <br />

        <div className="row">
          {this.state.progress > 0 && 
            <progress value={this.state.progress} max="100" className="progress" />
          }
        </div>
        <br />
        <br />
        {this.state.url && 
          <img
            src={this.state.url}
            alt="Uploaded"
          />
        }
      </div>
    );
  }
}

export default withFirebase(ImageUpload);