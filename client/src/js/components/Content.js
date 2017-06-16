/**
 * Created by govind on 11/19/16.
 */

/**
 * Created by govind on 7/16/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
// import Box from 'grommet/components/Box';

import {importLocalFiles} from '../actions/actions';
import {indexLoad, indexUnLoad, indexNextMore, showModal, indexAdd, indexNav} from '../actions/indexactions';

class Content extends Component{

  constructor(props) {
    super(props);

    this.onImportClick = this.onImportClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClick = this.onClick.bind(this);

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

  }

  onClick (event) {
    console.log("onClick: ", event.target.innerText);
    if(event.target.innerText == "Photos") {
      this.props.dispatch(indexNav("/photos", "photos", event));

    } else if(event.target.innerText == "Digital Library") {
      this.props.dispatch(indexNav("/digitallibrary", "digitallibrary", event));

    } else if(event.target.innerText == "Financials") {
      this.props.dispatch(indexNav("/financials", "financials", event));

    }

  }

  onImportClick (e) {
    console.log("Import clicked...", this.state.importpath);
    this.props.dispatch(importLocalFiles(this.state.importpath));

  }

  onInputChange (e) {
    console.log("Input changed...", e.target.value);
    this.setState({importpath: e.target.value});
    // this.state.importpath = e.target.value;
  }

  componentWillUnmount () {

  }

  render () {

    return (
      <div>
        
      </div>
    );
    // return (
    //   <Box direction="row">
    //     <Box margin="medium" pad="medium" align="center" justify="center" colorIndex="neutral-1" wrap={true} onClick={this.onClick}>
    //       Photos
    //     </Box>
    //     <Box margin="medium" pad="medium" align="center" justify="center" colorIndex="neutral-2" wrap={true} onClick={this.onClick}>
    //       Digital Library
    //     </Box>
    //     <Box margin="medium" pad="medium" align="center" justify="center" colorIndex="neutral-3" wrap={true} onClick={this.onClick}>
    //       Assets
    //     </Box>
    //     <Box margin="medium" pad="medium" align="center" justify="center" colorIndex="neutral-4" wrap={true} onClick={this.onClick}>
    //       Financials
    //     </Box>
    //     <Box margin="medium" pad="medium" align="center" justify="center" colorIndex="neutral-1" wrap={true} onClick={this.onClick}>
    //       Medical
    //     </Box>
    //     <Box margin="medium" pad="medium" align="center" justify="center" colorIndex="neutral-2" wrap={true} onClick={this.onClick}>
    //       Travel
    //     </Box>
    //     <Box margin="medium" pad="medium" align="center" justify="center" colorIndex="neutral-3" wrap={true} onClick={this.onClick}>
    //       Diary
    //     </Box>
    //   </Box>
    // );
  }
}


Content.contextTypes = {
  store: PropTypes.object
};

Content.propTypes = {
  type: PropTypes.string.isRequired,
  hosturl: PropTypes.string.isRequired,

  index: PropTypes.shape({
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    result: {
    },
    view: PropTypes.oneOf(["table", "tiles", "list"]),
    addRoute: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const category = 'Content';

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};

// module.exports = Content;

export default connect(mapStateToProps)(Content);