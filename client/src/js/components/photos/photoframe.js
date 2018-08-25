/**
 * Created by govind on 7/23/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {filesServerBaseURL} from '../../Api';
import {itemLoad, itemUnload} from '../../actions/itemactions';
import {globalFetch} from '../../actions/indexactions';

// var PhotoFrame = React.createClass({
class PhotoFrame extends Component {

  constructor() {
    super();
    this._onClickImage = this._onClickImage.bind(this);
    this._onTagInput = this._onTagInput.bind(this);
    this._onRate = this._onRate.bind(this);
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

  _onClickImage(e) {

    console.log("onClickImage......this.props.index", this.props.index);

    // pass this index of the photoitem in the photos list
    this.props.onSelect(this.props.index);
    // Get the photo details from server as the user clicked for viewing
    this.props.dispatch(itemLoad("photoframe", this.props.photoitem));
  }

  _onRate(e) {

    console.log("photoframe onRate: ", e);

  }
  _onTagInput(e) {

    console.log("onTagInput......", e.target.value);
    this.props.dispatch(globalFetch("photoframe", {tag: e.target.value}));


  }

  componentWillReceiveProps(nextProps) {
    console.log("photoframe: componentWillReceiveProps: ", nextProps);
    // if (nextProps.category && this.props.category !== nextProps.category) {
    //   this.props.dispatch(indexUnload(this.props.index));
    //   this.props.dispatch(
    //     indexLoad(nextProps.category, nextProps.index, this.props.selection));
    // }

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
    // console.log("photoframe: componentWillUnmount: enter");

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

    return (
      <div className="ui card">
        <div className="image">
          <img src={filesServerBaseURL() + this.props.photoitem.container + "/" + this.props.photoitem.id + '/?size=small'} onClick={this._onClickImage}/>
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

    // <p><b>Shot By</b> {photo.exif['Exif IFD0']['Make']} {photo.exif['Exif IFD0']['Model']}</p>

    return (
      <div className="ui cards">
        <div className="ui  fluid card">
          <img className="ui fluid image" src={filesServerBaseURL()  + photo.container + "/" + photo.id + '/?size=full'} onClick={this._onClickImage}/>
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
  // var item = state.index.getIn(['categories', category]);

  return {
    category: category,
    photoitem_ex: state.index.getIn(['category', category, 'item'])

  };
};


export default connect(mapStateToProps)(PhotoFrame);

// module.exports = PhotoFrame;