import React from 'react';
import './Landing.css';

class Landing extends React.Component {

  render() {
    return (
      <div className="Landing">
        <header className="Landing-header">
          <h1 className="title">Memehub</h1>
          <h3 className="title">Because memes are cool! <br/> We're making our own meme API!</h3>
        </header>
        {/* <section className="section">
          <p className="title">Search for one and if you are lucky you might find what you're searching for! <br/>
          Or you can add your own with your own keywords and find it later!</p>
        </section> */}
      </div>
    );
  }

}

export default Landing;
