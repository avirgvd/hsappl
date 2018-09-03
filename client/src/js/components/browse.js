/**
 * Created by govind on 9/19/16.
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {indexNav} from '../actions/indexactions';
import {getFileBaseURL} from '../Api';
var HSFileUpload = require('./hsfileupload/hsfileupload');

class Browse extends Component {

  constructor() {
    super();
    console.log("Browse");

    this.onTileClick= this.onTileClick.bind(this);
    this._onSearchChange = this._onSearchChange.bind(this);
    this._onSearchClick = this._onSearchClick.bind(this);
    this._onSearchEnter = this._onSearchEnter.bind(this);

    this.state = {search: "", query: {}, selection: -1};
  }

  _onSearchChange (event) {
    console.log("Main: _onChange: ", event.target.value);
    console.log("Main: this.state: ", this.state);
    this.setState({search: event.target.value});
  }


  _onSearchClick (event) {
    console.log("Main: _onSearchClick: event: ", event.target);
    console.log("Main: _onSearchClick: this.state: ", this.state);


    this.props.dispatch(indexNav("search", "search", {search: this.state.search}));
  }

  _onSearchEnter (event) {
    console.log("Main: _onSearchEnter: event: ", event.target);
    console.log("Main: _onSearchEnter: event key: ", event.key);
    if(event.key === 'Enter') {
      this.props.dispatch(indexNav("/search", "search", {}));
    }
  }

  onTileClick (event) {
    console.log("on tile click: ", event.target);
    console.log("on tile click: ", event.target.getAttribute('name'));

    this.props.dispatch(indexNav('/directories', 'directories', {"category": event.target.getAttribute('name')}));
    // if(event.target.getAttribute('name') == 'photos') {
    //   this.props.dispatch(indexNav('/directories', 'directories', {"category": "photos"}));
    // }
    // else {
    //   this.props.dispatch(indexNav(event.target.getAttribute('name'), event.target.getAttribute('name')));
    // }

  }


  render () {

    const { store } = this.context;

    console.log("Browse: this.state: ", this.state);
    console.log("Browse: this.props.index: ", this.props.index);

    return (
      <div className="ui equal width center aligned padded grid" featureName="potos" >
        <div className="ui container">
          <div className="column">
            <a>
              <HSFileUpload caption="Upload Files" tag="generic"/>
            </a>
            <a className="ui icon fluid input">
              <i className="inverted circular search link icon" onClick={this._onSearchClick}></i>
              <input placeholder="Global Search..." type="text" onKeyPress={this._onSearchEnter}  onChange={this._onSearchChange}></input>
            </a>
          </div>
        </div>
        <div className="ui stackable cards" onClick={this.onTileClick}>
          <div className="ui link card"  >
            <div className="image" >
              <img src={ getFileBaseURL("system") + "contacts.png"} className="ui fluid floated small image" name="contacts" ></img>
            </div>
            <div className="content" >
              <div className="header">Contacts</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card" >
            <div className="image" >
              <img src={ getFileBaseURL("system") + "photos.png"} className="ui fluid floated small image" name="photos" ></img>
            </div>
            <div className="content" >
              <div className="header">Photos</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card" >
            <div className="image" >
              <img src={ getFileBaseURL("system") + "Music.jpg"} className="ui fluid floated small image" name="audios" ></img>
            </div>
            <div className="content" >
              <div className="header">Audios and Music</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card" >
            <div className="image" >
              <img src={ getFileBaseURL("system") + "Videos.jpg"} className="ui fluid floated small image" name="videos" ></img>
            </div>
            <div className="content" >
              <div className="header">Videos and Movies</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ getFileBaseURL("system") + "DigitalLibrary.png"} className="ui fluid floated small image" name="digitallibrary" ></img>
            </a>
            <div className="content" >
              <div className="header">Digital Library</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ getFileBaseURL("system") + "Financials.png"} className="ui fluid floated small image" name="financials" ></img>
            </a>
            <div className="content" >
              <div className="header">Financials</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ getFileBaseURL("system") + "medical_records.png"} className="ui fluid floated small image" name="medical" ></img>
            </a>
            <div className="content" >
              <div className="header">Medical Records</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ getFileBaseURL("system") + "travel.jpg"} className="ui fluid floated small image" name="travel" ></img>
            </a>
            <div className="content" >
              <div className="header">Travel</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ getFileBaseURL("system") + "Assets.jpg"} className="ui fluid floated small image" name="assets" ></img>
            </a>
            <div className="content" >
              <div className="header">Assets</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ getFileBaseURL("system") + "Unknown.jpg"} className="ui fluid floated small image" name="unknown" ></img>
            </a>
            <div className="content" >
              <div className="header">Unknown</div>
              <div className="meta">
                <span className="category"></span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ getFileBaseURL("system") + "Settings.png"} className="ui fluid floated small image" name="settings" ></img>
            </a>
            <div className="content" >
              <div className="header">Settings</div>
              <div className="meta">
                <span className="category"></span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }

};

Browse.contextTypes = {
  store: PropTypes.object
};

Browse.propTypes = {
  browseitem1: PropTypes.shape({
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
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  const category = 'browse';

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};


export default connect(mapStateToProps)(Browse);