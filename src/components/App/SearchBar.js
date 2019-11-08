import React, { Component } from 'react';
import './SearchBar.css';
import { withFirebase } from './../Firebase';

class SearchBar extends Component {
  state = {
    searchText:'',
    memesList: [],
    loading:false,
    doneSearching: false
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

    onKeyDown = (e)=> {
    if(e.key === 'Enter') {
      this.setState({doneSearching:true, memesList:[]})
      this.props.firebase.searchWithKeywords(this.state.searchText.split(" ")).get()
      .then((querySnapshot)=> {
        querySnapshot.forEach(doc=> {
          // console.log(doc.data())
          this.setState({memesList:[...this.state.memesList, doc.data()]})
        })
        this.props.handleKeyDown(this.state.memesList)
        this.setState({loading:false})
      })
      .catch((error)=> {
          console.log("Error getting documents: ", error);
          alert(error)
          this.setState({loading:false})
      });
    }
  }
  render() {
    return (
      <div className="search-div">
        <i className="fa fa-search search-icon"></i>
        <input className="search-input" 
        type="text"
        value={this.state.searchText} 
        onKeyDown={(e)=> {
          this.props.handleChange(e);
          this.onKeyDown(e)
        } }
        name="searchText"
        onChange ={(e)=> {
          this.onChange(e)
        } } 
        placeholder="Search meme"/>
      </div>
    );
  }
}

export default withFirebase(SearchBar)
