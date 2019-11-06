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
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
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
              userId: this.props.authUser.uid
            });
          })
          .then(()=> {
            this.setState({image: null,
              progress: 0,
              keywords:'',
              title:''})
          })
          .catch(e=>console.log(e,'something is wrong!!!'))
      }
    );
  };
  render() {
    return (
      <div className="center">
          <br/>
          <h2 className="green-text">React Firebase Image Uploader</h2>
        <br />
        <div className="file-field input-field">
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" value={this.state.title} placeholder="Title" name="title" onChange={(e)=> this.onChange(e)}/>
          </div>
          <div className="btn">
            <span>File</span>
            <input type="file" onChange={this.handleChange} />
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
        <br />
        <br/>
        <br/>
        <div className="row">
          <progress value={this.state.progress} max="100" className="progress" />
        </div>
        <br />
        <br />
        <img
          src={this.state.url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400"
        />
      </div>
    );
  }
}

export default withFirebase(ImageUpload);