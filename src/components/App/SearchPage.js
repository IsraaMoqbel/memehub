import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
// import Dots from 'react-activity/lib/Dots';
// import 'react-activity/lib/Dots/Dots.css';

class SearchPage extends Component {

  render() {
    return (
      <div className="search-results">
        <section>
        { 
          // this.props.loading ? <Dots /> : 
          this.props.memesList && this.props.memesList.length > 0 ? (<React.Fragment>
          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
            {this.props.memesList.map(doc => <img src={doc.url} alt={doc.title} key={doc.timeUploded}/>)}
          </div>
          </React.Fragment>) : <p className="title">No results yet!</p>
        }
        </section>
      </div>
    );
  }
}

export default withFirebase(SearchPage)
