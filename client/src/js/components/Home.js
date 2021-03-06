/**
 * Created by govind on 7/16/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

// import Notification from 'grommet/components/Notification';
// import Box from 'grommet/components/Box';
// import Button from 'grommet/components/Button';
// import TextInput from 'grommet/components/TextInput';

import {importLocalFiles} from '../actions/actions';

class Home extends Component{

  constructor(props) {
    super(props);

    this.onImportClick = this.onImportClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

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

    var state = "Importing the files from " + "<--get it from state-->";

    return(
      <div className="ui doubling stackable grid container">
        

        <div className="ui blue container" width="100%">
          <div className="ui fluid action input" onChange={this.onInputChange}>
            <input placeholder="Import from local directory..." type="text"></input>
            <button className="ui button" onClick={this.onImportClick}>Import Files</button>
          </div>
          <div className="ui indicating teal  progress">
            <div className="bar">
              <div className="progress"></div>
            </div>
            <div className="label">Importing Files</div>
          </div>
        </div>


      </div>

      );

  }
}


Home.contextTypes = {
  store: PropTypes.object
};

Home.propTypes = {
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
  const category = 'home';

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};

// module.exports = Home;

export default connect(mapStateToProps)(Home);