/**
 * Created by govind on 7/23/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {getFileBaseURL} from '../../Api';
import {itemLoad, itemUnload} from '../../actions/itemactions';
import {globalFetch} from '../../actions/indexactions';

// var PhotoFrame = React.createClass({
class PhotoFrame extends Component {

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._onTagInput = this._onTagInput.bind(this);
    this._onRate = this._onRate.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.refs1 = this.refs1.bind(this);

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

    console.log("PhotoFrame: onClick......this.props.index", this.props.index);

    // pass this index of the photoitem in the photos list
    this.props.onSelect(this.props.index);
    // Get the photo details from server as the user clicked for viewing
    // this.props.dispatch(itemLoad("photoframe", this.props.photoitem));
  }

  _onRate(e) {

    console.log("photoframe onRate: ", e);

  }
  _onTagInput(e) {

    console.log("onTagInput......", e.target.value);
    this.props.dispatch(globalFetch("photoframe", {tag: e.target.value}));


  }

  onPrev(ev) {
    console.log("Photoframe:onPrev: ", this.props.index);

    ev.preventDefault();
    this.props.onSelect(this.props.index - 1);

  }

  onNext(ev) {
    console.log("Photoframe:onNext: ", this.props.index);

    ev.preventDefault();
    this.props.onSelect(this.props.index + 1);
  }


  componentWillReceiveProps(nextProps) {
    console.log("photoframe: componentWillReceiveProps: ", nextProps);
    // if (nextProps.category && this.props.category !== nextProps.category) {
    //   this.props.dispatch(indexUnload(this.props.index));
    //   this.props.dispatch(
    //     indexLoad(nextProps.category, nextProps.index, this.props.selection));
    // }

  }

  _handleKeyPress(event){
    // console.log("BookInfo: _handleKeyPress: ", event.code);
    if(event.code === 'ArrowRight'){
      this.onNext(event);

    }
    else if(event.code === 'ArrowLeft') {
      this.onPrev(event);

    }

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
    // console.log("photoframe: componentDidMount: enter");
  }


  componentWillUnmount () {
    window.removeEventListener('keypress', this._handleKeyPress);

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

    // console.log("photoframe: render: props: ", this.props);

    if (this.props.view === 'listview') {

      return this.renderListViewItem();

    } else if (this.props.view === 'slideview') {

      return this.renderSlideViewItem();

    } else {

      return this.renderFullView();

    }

  }

  refs1(element) {
    const $element = $(element);
    $element.rating();
  }

  renderListViewItem () {
    // console.log("photoframe: renderListViewItem: props: ", this.props);

    return (
      <div className="ui card">
        <div className="image">
          <img src={getFileBaseURL() + this.props.photoitem.container + "/" + this.props.photoitem.id + '/?size=small'} onClick={this._onClick}/>
        </div>
        <div className="content">

          <div className="meta">
            <span className="date">{this.props.photoitem.file_date}</span>
          </div>

          <div className="meta">
            <span className="location">{this.props.location}</span>
          </div>

          <div className="description">
            {this.props.photoitem.orgfilename}
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
    // var photo = this.props.photoitem_ex.get('result').get('items');
    var photo = this.props.photoitem;
    console.log("photoframe renderFullView photo: ", photo);

    // handle keypress only in Full View
    window.addEventListener('keypress', this._handleKeyPress);

    return (
      <div className="ui cards">
        <div>
          <div className="ui label">
            <div className="detail">Showing item number {this.props.index}</div>
          </div>
          <button className="ui left labeled icon button" onClick={this.onPrev}>
            <i className="left arrow icon"></i>
            Prev
          </button>
          <button className="ui right labeled icon button"  onClick={this.onNext}>
            <i className="right arrow icon"></i>
            Next
          </button>
        </div>

        <div className="ui  fluid card">


          <img className="ui fluid image" src={getFileBaseURL()  + photo.container + "/" + photo.id + '/?size=full'} onClick={this._onClick}/>
          <div className="content">
            <a className="header">{photo.originalname}</a>
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
            <a className="ui red circular label">2</a>
            <a className="ui tag label">New</a>
          </div>
          <div className="ui left icon input  loading">
            <input placeholder="Search..." type="text" onChange={this._onTagInput}></input>
            <i class="search icon"></i>
          </div>
        </div>
      </div>
    );
  }


};

PhotoFrame.contextTypes = {
  store: PropTypes.object
};

// TODO: the variables photoitem, photoitem2 and photoitem1 needs to be reduced to one variable 4/22/2018
PhotoFrame.propTypes = {

  photoitem_ex: PropTypes.object,
  photoitem: PropTypes.object,
  dispatch: PropTypes.func.isRequired


};

const mapStateToProps = (state, props) => {

  const category = 'photoframe';

  return {
    category: category,
    photoitem_ex: state.index.getIn(['category', category, 'item'])

  };
};


export default connect(mapStateToProps)(PhotoFrame);

// module.exports = PhotoFrame;