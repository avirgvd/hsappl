/**
 * Created by govind on 7/22/16.
 */

// var React = require('react');
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import PhotoFrame from './photoframe';
// var PhotoFrame = require('./photoframe');
var index = require("../../actions/indexactions");

class Photos extends Component {

  constructor(props) {
    super(props)

    console.log("Photos constructuor");

  }

  // getInitialState () {
  //   return {
  //     type: 'items',
  //     category: 'photos',
  //     items: [],
  //     filters: {},
  //     start: 0,
  //     count: 20,
  //     total: 0
  //   }
  // }

  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount() {

  }

  /*
   * This function will be called after render()
   * It is good idea to perform any async operations here as render can show some default
   * content first and this function can asyncronously trigger render() when there is data
   * */
  componentDidMount() {
    this.props.dispatch(index.indexLoad("photos"));

  }


  componentWillUnmount() {

  }

  render() {

    console.log("this.props: ", this.props);
    console.log("this.state: ", this.state);
    return (
      <div className="ui grid container">
        <div>
          <PhotoFrame img_src="" desc="test description1" />
        </div>
        <div>
          <PhotoFrame img_src="" desc="test description2" />
        </div>
        <div>
          <PhotoFrame img_src="" desc="test description3" />
        </div>
        <div>
          <PhotoFrame img_src="" desc="test description4" />
        </div>
        <div>
          <PhotoFrame img_src="" desc="test description5" />
        </div>
      </div>
    );
  }
}

// Photos.propTypes = {
//   items: PropTypes.array.isRequired,
//   dispatch: PropTypes.func.isRequired
// };

Photos.contextTypes = {
 store: PropTypes.object
};

Photos.propTypes = {
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.object,
  start: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {

  };
};


// export default connect(mapStateToProps)(Photos);
