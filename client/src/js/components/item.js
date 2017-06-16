/**
 * Created by govind on 7/23/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {itemLoad, itemUnload} from '../actions/itemactions';

// var PhotoFrame = React.createClass({
class Item extends Component {

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  // getDefaultProps () {
  //
  //   return {
  //     id: "000",
  //     src: "jkjkjk",
  //     desc: 'Welcome home from props!'
  //   }
  // }

  // getInitialState: function () {
  //   return {
  //     key: 0,
  //     img_src: "",
  //     date: "",
  //     location: "",
  //     tags: "",
  //     desc: 'Welcome home from propsvvvvvvvvvvvvv!'
  //   }
  // },

  _onClick(e) {

    console.log("item onClick......", e);

    this.props.onSelect(this.props.item);

  }

  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount () {

  }

  /*
   * This function will be called after render()
   * It is good idea to perform any async operations here as render can show some default
   * content first and this function can asyncronously trigger render() when there is data
   * */
  componentDidMount () {
    this.props.dispatch(itemLoad("item", {}));
  }


  componentWillUnmount () {

  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("photoframe:componentWillReceiveProps...nextProps: ", nextProps);
  //
  //   if (nextProps.category && this.props.category !== nextProps.category) {
  //     this.props.dispatch(itemUnload(this.props.index));
  //     this.props.dispatch(
  //       itemLoad(nextProps.category, nextProps.index, this.props.selection));
  //   }
  //
  // },

  render () {
    const { store } = this.context;

    console.log("item props: ", this.props);

    if (this.props.view === 'listview') {

      return this.renderListViewItem();

    } else if (this.props.view === 'slideview') {

      return this.renderSlideViewItem();

    } else {

      return this.renderFullView();

    }

  }

  renderListViewItem () {
    console.log("item listview props: ", this.props);

    return (
      <div className="ui card">
        <div className="image">
          <img src={'http://192.168.1.130:3000/' + this.props.photoitem.filename} onClick={this._onClickImage}/>
        </div>
        <div className="content">
          <div className="meta">
            <span className="date">{this.props.photoitem.exif.File['File Modified Date']}</span>
          </div>
          <div className="meta">
            <span className="location">{this.props.location}</span>
          </div>
          <div className="description">
            {this.props.photoitem.originalname}
          </div>
        </div>
        <div className="extra content">
          <a>
            <i className="user icon"></i>
            {this.props.tags}
          </a>
        </div>
      </div>
    );
  }

  renderSlideViewItem () {


  }

  renderFullView () {
    // console.log("photoframe renderFullView props: ", this.props);
    var photo = this.props.photoitem1.get('result').get('item');
    console.log("photoframe renderFullView photo: ", photo);

    return (
      <div className="ui grid container">
      <div className="ui  fluid card">
          <img className="ui fluid image" src={'http://192.168.1.130:3000/' + photo.filename} onClick={this._onClickImage}/>
        <div className="content">
          <div className="meta">
            <span className="date"></span>
          </div>
          <div className="meta">
            <span className="location"></span>
          </div>
          <div className="description">
            {photo.originalname}
          </div>
        </div>
        <div className="extra content">
          <a>
            <i className="user icon"></i>
            {this.props.tags}
          </a>
        </div>
      </div>
      </div>
    );
  }


};

Item.contextTypes = {
  store: PropTypes.object
};

Item.propTypes = {

  photoitem1: PropTypes.shape({
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    label: PropTypes.string,
    view: PropTypes.string.isRequired,
    result: {
      item: PropTypes.arrayOf(PropTypes.object),
    },
    addRoute: PropTypes.string
  }).isRequired,
  photoitem: PropTypes.object,
  dispatch: PropTypes.func.isRequired


};

const mapStateToProps = (state, props) => {
  const category = 'item';

  return {
    category: category,
    photoitem1: state.index.getIn(['categories', category])

  };
};


export default connect(mapStateToProps)(Item);

// module.exports = PhotoFrame;