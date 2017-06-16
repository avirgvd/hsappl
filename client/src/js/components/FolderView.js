/**
 * Created by govind on 12/12/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

// import Notification from 'grommet/components/Notification';
// import Box from 'grommet/components/Box';
// import Button from 'grommet/components/Button';
// import TextInput from 'grommet/components/TextInput';

import {importLocalFiles} from '../actions/actions';

class FolderView extends Component{

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
    // return (
    //   <Box pad='medium' >
    //
    //     <Notification state={state} status="Ok" size="medium" full={false}
    //                    percentComplete={33}/>
    //     <TextInput placeHolder="Import from local directory..." onDOMChange={this.onInputChange}  />
    //     <Button onClick={this.onImportClick} label="Bulk Import Files" primary={true} />
    //   </Box>
    //
    // );
    return(
      <div className="ui doubling stackable grid container">
        <div className="ui styled accordion">
          <div className="active title">
            <i className="dropdown icon"></i>
            {this.props.name}

          </div>
          <div className="active content">
            Welcome to level 1
            <div className="accordion">
              <div className="title">
                <i className="dropdown icon"></i>
                Level 1A
              </div>
              <div className="content">
                <p className="transition hidden">Level 1A Contents</p>
                <div className="accordion transition hidden">
                  <div className="title">
                    <i className="dropdown icon"></i>
                    Level 1A-A
                  </div>
                  <div className="content">
                    Level 1A-A Contents
                  </div>
                  <div className="title">
                    <i className="dropdown icon"></i>
                    Level 1A-B
                  </div>
                  <div className="content">
                    Level 1A-B Contents
                  </div>
                </div>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Level 1B
              </div>
              <div className="content">
                Level 1B Contents
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Level 1C
              </div>
              <div className="content">
                Level 1C Contents
              </div>
            </div>
          </div>
          <div className="title">
            <i className="dropdown icon"></i>
            Level 2
          </div>
          <div className="content">
            <p>Welcome to level 2</p>
            <div className="accordion">
              <div className="active title">
                <i className="dropdown icon"></i>
                Level 2A
              </div>
              <div className="active content">
                <p>Level 2A Contents</p>
                <div className="accordion">
                  <div className="title">
                    <i className="dropdown icon"></i>
                    Level 2A-A
                  </div>
                  <div className="content">
                    Level 2A-A Contents
                  </div>
                  <div className="title">
                    <i className="dropdown icon"></i>
                    Level 2A-B
                  </div>
                  <div className="content">
                    Level 2A-B Contents
                  </div>
                </div>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Level 2B
              </div>
              <div className="content">
                Level 2B Contents
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Level 2C
              </div>
              <div className="content">
                Level 2C Contents
              </div>
            </div>
          </div>
        </div>
        <div className="ui list">
          <div className="item">
            <i className="folder icon"></i>
            <div className="content">
              <div className="header">src</div>
              <div className="description">Source files for project (10 Folders and 322 Files) </div>
              <div className="list">
                <div className="item">
                  <i className="folder icon"></i>
                  <div className="content">
                    <div className="header">site</div>
                    <div className="description">Your site's theme</div>
                  </div>
                </div>
                <div className="item">
                  <i className="folder icon"></i>
                  <div className="content">
                    <div className="header">themes</div>
                    <div className="description">Packaged theme files</div>
                    <div className="list">
                      <div className="item">
                        <i className="folder icon"></i>
                        <div className="content">
                          <div className="header">default</div>
                          <div className="description">Default packaged theme</div>
                        </div>
                      </div>
                      <div className="item">
                        <i className="folder icon"></i>
                        <div className="content">
                          <div className="header">my_theme</div>
                          <div className="description">Packaged themes are also available in this folder</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <i className="file icon"></i>
                  <div className="content">
                    <div className="header">theme.config</div>
                    <div className="description">Config file for setting packaged themes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <i className="folder icon"></i>
            <div className="content">
              <div className="header">dist</div>
              <div className="description">Compiled CSS and JS files</div>
              <div className="list">
                <div className="item">
                  <i className="folder icon"></i>
                  <div className="content">
                    <div className="header">components</div>
                    <div className="description">Individual component CSS and JS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <i className="file icon"></i>
            <div className="content">
              <div className="header">semantic.json</div>
              <div className="description">Contains build settings for gulp</div>
            </div>
          </div>
        </div>
      </div>

    );

  }
}


FolderView.contextTypes = {
  store: PropTypes.object
};

FolderView.propTypes = {
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

// module.exports = FolderView;

export default connect(mapStateToProps)(FolderView);