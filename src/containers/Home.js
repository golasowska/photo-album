import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import _ from 'lodash';
import { PacmanLoader } from 'react-spinners';
import Slider from 'react-slick';
import {
  vanishIn,
  perspectiveDown,
  magic,
  swashOut,
  swashIn,
  vanishOut,
  puffOut,
  foolishIn,
  holeOut,
  twisterInDown,
  swap,
  puffIn,
  openDownLeft,
  openDownRight,
  openUpLeft,
  openUpRight,
  openDownLeftOut,
  openDownRightOut,
  openUpLeftOut,
  openUpRightOut,
  perspectiveUp,
  perspectiveLeft,
  perspectiveRight,
  rotateDown,
  rotateUp,
  rotateLeft,
  rotateRight,
  slideDownReturn,
  slideUpReturn,
  slideLeftReturn,
  slideRightReturn,
  spaceOutUp,
  spaceOutRight,
  spaceOutDown,
  spaceOutLeft,
  spaceInUp,
  spaceInRight,
  spaceInDown,
  spaceInLeft,
  boingInUp,
  boingOutDown,
  bombRightOut,
  bombLeftOut,
  tinRightOut,
  tinLeftOut,
  tinUpOut,
  tinDownOut,
  tinRightIn,
  tinLeftIn,
  tinUpIn,
  tinDownIn,
  foolishOut
} from 'react-magic/lib';
import { StyleSheet, css } from 'aphrodite';

import PrevPhoto from './PrevPhoto';
import SearchBar from './SearchBar';

const animations = [
  vanishIn,
  perspectiveDown,
  magic,
  swashOut,
  swashIn,
  vanishOut,
  puffOut,
  foolishIn,
  holeOut,
  twisterInDown,
  swap,
  puffIn,
  openDownLeft,
  openDownRight,
  openUpLeft,
  openUpRight,
  openDownLeftOut,
  openDownRightOut,
  openUpLeftOut,
  openUpRightOut,
  perspectiveUp,
  perspectiveLeft,
  perspectiveRight,
  rotateDown,
  rotateUp,
  rotateLeft,
  rotateRight,
  slideDownReturn,
  slideUpReturn,
  slideLeftReturn,
  slideRightReturn,
  spaceOutUp,
  spaceOutRight,
  spaceOutDown,
  spaceOutLeft,
  spaceInUp,
  spaceInRight,
  spaceInDown,
  spaceInLeft,
  boingInUp,
  boingOutDown,
  bombRightOut,
  bombLeftOut,
  tinRightOut,
  tinLeftOut,
  tinUpOut,
  tinDownOut,
  tinRightIn,
  tinLeftIn,
  tinUpIn,
  tinDownIn,
  foolishOut
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationStyleNum: 0
    };
  }
  componentDidMount = () => {
    this.props.downloadGallery('cat');
  };

  renderPrevs = () => {
    return _.map(this.props.album, item => {
      return item.map((photo, index) => {
        return <PrevPhoto key={photo.id} photo={photo} index={index} />;
      });
    });
  };

  changeAnim = index => {
    let styles = StyleSheet.create({
      magic: {
        animationName: animations[this.state.animationStyleNum],
        animationDuration: '2s'
      }
    });
    const photo = document.querySelector('#photo');
    photo.classList.remove(css(styles.magic));
    setTimeout(() => {
      this.props.setIndex(index);
      photo.classList.add(css(styles.magic));
    }, 10);
  };

  changeAnimationStyle = () => {
    if (this.state.animationStyleNum === animations.length) {
      this.setState({
        animationStyleNum: 0
      });
    } else {
      this.setState({
        animationStyleNum: this.state.animationStyleNum + 1
      });
    }
  };

  renderPhoto = () => {
    let styles = StyleSheet.create({
      magic: {
        animationName: animations[this.state.animationStyleNum],
        animationDuration: '2s'
      }
    });
    let index = this.props.index;
    const { farm, server, id, secret, title } = this.props.album[0][index];
    let source = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

    return (
      <img
        id="photo"
        className={`${css(styles.magic)} photo-det`}
        alt={title}
        src={source}
      />
    );
  };

  // next = () => {
  //   this.slider.slickNext();
  //   this.props.setIndex(this.slider.innerSlider.state.currentSlide);
  // };
  //
  // prev = () => {
  //   this.slider.slickPrev();
  //   this.props.setIndex(this.slider.innerSlider.state.currentSlide);
  // };

  render() {
    const settings = {
      infinite: true,
      speed: 1000,
      slidesToShow: 4,
      arrows: false,
      focusOnSelect: true,
      variableWidth: true,
      centerMode: true,
      className: 'center slider-preview',
      animating: true,
      responsive: [
        {
          breakpoint: 540,
          settings: {
            slidesToShow: 2,
            variableWidth: false
          }
        }
      ]
    };
    return (
      <div className="container text-center">
        {!this.props.album ? (
          <div className="d-flex justify-content-center mt-5">
            <PacmanLoader color={'#03a9f4'} loading={true} />
          </div>
        ) : null}
        {this.props.album ? (
          <div>
            <div className="card mt-3 mb-5">
              <div className="m-3 card-body">{this.renderPhoto()}</div>
            </div>
            <Slider
              {...settings}
              ref={c => (this.slider = c)}
              afterChange={index => {
                this.changeAnim(index);
              }}
            >
              {this.renderPrevs()}
            </Slider>
            <div className="row justify-content-center">
              <SearchBar />
              <button
                type="button"
                className="btn btn-info col col-md-4"
                onClick={this.changeAnimationStyle}
              >
                change animation
              </button>
            </div>
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
