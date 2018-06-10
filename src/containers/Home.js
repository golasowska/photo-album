import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import _ from 'lodash';
import { PacmanLoader } from 'react-spinners';
import Slider from 'react-slick';

import PrevPhoto from './PrevPhoto';

class Home extends Component {
  componentDidMount = () => {
    this.props.downloadGallery();
  };

  renderPrevs = () => {
    return _.map(this.props.album, item => {
      return item.map((photo, index) => {
        return <PrevPhoto key={photo.id} photo={photo} index={index} />;
      });
    });
  };

  renderPhoto = () => {
    let index = this.props.index;
    const { farm, server, id, secret, title } = this.props.album[0][index];
    let source = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

    return <img className="photo" alt={title} src={source} />;
  };

  next = () => {
    this.slider.slickNext();
    this.props.setIndex(this.props.index + 1);
  };

  prev = () => {
    this.slider.slickPrev();
    this.props.setIndex(this.props.index - 1);
  };

  render() {
    return (
      <div className="container">
        {!this.props.album ? (
          <div className="d-flex justify-content-center mt-5">
            <PacmanLoader color={'#171716'} loading={true} />
          </div>
        ) : null}
        {this.props.album ? (
          <div>
            <div className="">{this.renderPhoto()}</div>
            <div />
            <Slider
              ref={c => (this.slider = c)}
              infinite={true}
              speed={500}
              slidesToShow={4}
              arrows={false}
              focusOnSelect={true}
              variableWidth={true}
              centerMode={true}
              className="center"
            >
              {this.renderPrevs()}
            </Slider>
            <button className="btn btn-info" onClick={this.prev}>
              prev
            </button>
            <button className="btn btn-info" onClick={this.next}>
              next
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    album: state.album,
    index: state.index
  };
}

export default connect(mapStateToProps, Actions)(Home);
