/**
 * Created by govind on 7/22/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import PhotoFrame from '../photos/photoframe';
// var PhotoFrame = require('./photoframe');
// var index = require("../../actions/indexactions");

import {indexLoad, indexUnLoad, indexNextMore, indexNav} from '../../actions/indexactions';
import Immutable, {Map, List} from 'immutable';

// var Photos = React.createClass({
class Videos extends Component{

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
    this.props.dispatch(indexLoad("videos", {}));

  }

  componentWillUnmount() {
    console.log("videos componentWillUnmount");

    window.removeEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexUnLoad("videos", this.props.index));

  }


  handleScroll(event) {

    if (event.pageY === 0 ) {
      //if pageY == 0 the page is scrolled up to the TOP.
      // If previous items should be queried to server then this is that place
      console.log("handleScroll UP so get previous items");
      // this.props.dispatch(indexPrevMore("videos"));
    } else if (event.pageY === event.view.scrollMaxY) {
      //if pageY == 0 the page is scrolled down to the END.
      // If next items should be queried to server then this is that place
      console.log("handleScroll DOWN so get more ahead index: ", this.props.index);
      console.log("handleScroll DOWN so get more ahead index: ", this.state.query);
      this.props.dispatch(indexNextMore("videos", this.props.index, {query: this.state.query}));
    }

  }

  onClick(e) {
    console.log("videos clicked ", e);
    this.props.dispatch(indexNav("/photoframe", "photoframe"));
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
    
  }
  
  render () {
    const { store } = this.context;

    console.log("videos this.props: ", this.props);

    return (
      <div className="ui container stacked segment">
        <div className="ui label">
          Total
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
        </div>
      </div>
    );
  }
}

Videos.contextTypes = {
  store: PropTypes.object
};

Videos.propTypes = {
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
  const category = 'videos';

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};


// module.exports = Videos;
export default connect(mapStateToProps)(Videos);
