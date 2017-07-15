/**
 * Created by govind on 7/22/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import PhotoFrame from './photoframe';
// var PhotoFrame = require('./photoframe');
// var index = require("../../actions/indexactions");

import {indexLoad, indexUnLoad, indexNextMore, indexNav, indexFilter} from '../../actions/indexactions';
import Immutable, {Map, List} from 'immutable';

// var Photos = React.createClass({
class Photos extends Component{

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCameraFilterClick = this.onCameraFilterClick.bind(this);

    this.state = {query: {}};

  }

  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps: ", nextProps);
    if (nextProps.category && this.props.category !== nextProps.category) {
      this.props.dispatch(indexUnload(this.props.index));
      this.props.dispatch(
        indexLoad(nextProps.category, nextProps.index, this.props.selection));
    }

  }

  /*
   * This function will be called after render()
   * It is good idea to perform any async operations here as render can show some default
   * content first and this function can asyncronously trigger render() when there is data
   * */
  componentDidMount() {

    console.log("componentDidMount ", this.props.index);
    window.addEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexLoad("photos", this.props.index));

  }

  componentWillUnmount() {
    console.log("photos componentWillUnmount");

    window.removeEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexUnLoad("photos", this.props.index));

  }


  handleScroll(event) {

    if (event.pageY === 0 ) {
      //if pageY == 0 the page is scrolled up to the TOP.
      // If previous items should be queried to server then this is that place
      console.log("handleScroll UP so get previous items");
      // this.props.dispatch(indexPrevMore("photos"));
    } else if (event.pageY === event.view.scrollMaxY) {
      //if pageY == 0 the page is scrolled down to the END.
      // If next items should be queried to server then this is that place
      console.log("handleScroll DOWN so get more ahead index: ", this.props.index);
      console.log("handleScroll DOWN so get more ahead index: ", this.state.query);
      this.props.dispatch(indexNextMore("photos", this.props.index, {query: this.state.query}));
    }

  }

  onClick(e) {
    console.log("photos clicked ", e);
    this.props.dispatch(indexNav("/photoframe", "photoframe", e));
  }

  onCameraFilterClick(event) {
    console.log("onCameraFilterClick: event", );
    console.log("onCameraFilterClick: query: ", this.state.query);

    let query = {};

    if(this.state.query.hasOwnProperty('camerafilter')
          && event.target.innerText === this.state.query.camerafilter) {
      // If the user selects already selected filter item then remove that filter item
      query = {};
    } else {
      query = {camerafilter: event.target.innerText};
    }
    this.setState({query: query});
    console.log("onCameraFilterClick: after query: ", query);

    this.props.dispatch(indexFilter("photos", {query: query}));

  }
  


  render () {
    const { store } = this.context;

    console.log("photos this.props: ", this.props);
    console.log("photos this.props: ", this.props.index.getIn(['result']));

    var items = this.props.index.get('result').get('items');
    var filters = this.props.index.get('result').get('filters');
    console.log("photos filters: ", filters);
    console.log("photos filters.camera: ", filters.camera);
    console.log("photos items count: ", this.props.index.get('result').get('total'));

    // let elements = this.props.index.result.items.map((item, index) => {
    let elements = items.map((item, index) => {
      console.log("render: item: ", item);
      return (
        <div className="raised segment">
          <PhotoFrame photoitem={item} view='listview' onSelect={this.onClick}/>
        </div>
      );
    });

    let camerafilters = <div className="item"> None found!!!  </div>;

    if(filters.camera) {
      camerafilters = filters.camera.map((item, index) => {

        if(item === this.state.query.camerafilter) {
          return (
            <div className="ui selected  item" onClick={this.onCameraFilterClick}>
              {item}
            </div>
          );

        }
        else {
          return (
            <div className="ui item" onClick={this.onCameraFilterClick}>
              {item}
            </div>
          );

        }
      });

    }


    console.log("elements: ", elements);
    console.log("camerafilters: ", camerafilters);

    return (
      <div className="ui container stacked segment">
        <div className="ui label">
          Total
          <div className="detail">{this.props.index.get('result').get('total')}</div>
        </div>
        <div className="ui menu">
          <a className="ui button item">
            Location
          </a>
          <div className="ui simple labeled icon dropdown button">
            <i className="filter icon"></i>
            <span className="text">Camera</span>
            <div className="menu" onClick={this.onCameraFilterClick}>
              <a className="header">
                <i className="tags icon"></i>
                Filter by Camera
              </a>
              {camerafilters}
            </div>
          </div>
          <a className="item">
            Date
          </a>
          <a className="item">
            Rating
          </a>
        </div>
        <div className="ui internally celled grid">
          {elements}
        </div>
      </div>
    );
  }
}

Photos.contextTypes = {
  store: PropTypes.object
};

Photos.propTypes = {
  type: PropTypes.string.isRequired,
  hosturl: PropTypes.string.isRequired,

  index: PropTypes.shape({
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    label: PropTypes.string,
    query: PropTypes.object,
    filter: PropTypes.object,
    result: {
      begin: PropTypes.number,
      currentBegin: PropTypes.number,
      currentEnd: PropTypes.number,
      total: PropTypes.number,
      items: PropTypes.arrayOf(PropTypes.object),
    },
    view: PropTypes.oneOf(["table", "tiles", "list"]),
    addRoute: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

// for react-redux
const mapStateToProps = (state) => {
  const category = 'photos';

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};


// module.exports = Photos;
export default connect(mapStateToProps)(Photos);
