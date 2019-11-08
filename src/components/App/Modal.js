
import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick(e) {
    if(this.node.contains(e.target)) {
      return;
    } else {
      this.props.toggle();
    }
  }
  render() {
    return (
        <div className="modal">
          <div className="modal-content" ref={node=>this.node=node}>
          <span className="close" onClick={()=>this.props.toggle()}>&times;</span>
          {this.props.modalComponent}
          </div>
        </div>
    );
  }
}
export default Modal;
