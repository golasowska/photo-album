import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setIndex } from '../actions';

class PrevPhoto extends Component {
  changeIndex = () => {
    this.props.setIndex(this.props.index);
  };
  render() {
    const { farm, server, id, secret, title } = this.props.photo;

    let source = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

    return (
      <div className="">
        <img
          className="photo"
          alt={title}
          src={source}
          onClick={this.changeIndex}
        />
      </div>
    );
  }
}

export default connect(null, { setIndex })(PrevPhoto);
