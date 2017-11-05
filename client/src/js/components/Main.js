/**
 * Created by govind on 7/16/16.
 */

/*
 * This component is main component
 * This should include the application bar on top of the page
 *  * @type {*|exports|module.exports}
 */

import React, {Component, PropTypes} from 'react';

import {indexLoad, indexUnLoad, indexNextMore, showModal, indexAdd, indexNav} from '../actions/indexactions';

var Link = require('react-router').Link;
var HSFileUpload = require('./hsfileupload/hsfileupload');

var MENU_LABELS = {
  home: 'Home',
  contacts: 'Contacts',
  assets: 'Assets',
  browse: 'Browse',
  messages: 'Messages',
  activity: 'Activity',
  digitallib: 'Digital Library',
  financials: 'Financials',
  medical: 'Medical Information',
  photos: 'Photos',
  travel: 'Travel',
  unknown: 'Unknown Content',
  phase2: 'Phase 2',
  content: 'Content'
};

class Main extends Component {

  constructor () {
    super();
    this._onClick = this._onClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onSearchClick = this._onSearchClick.bind(this);
    this._onSearchEnter = this._onSearchEnter.bind(this);

  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  _onChange (event) {
    this.setState({text: event.target.value});
  }

  _onSearch (event) {
    console.log("Main: _onSearch: event: ", event.target.value);
    console.log("Main: _onSearch: children: ", this.props.children);
    console.log("Main: _onSearch: children: ", this.props.children.props.route.path);
  }

  _onSearchClick (event) {
    console.log("Main: _onSearchClick: event: ", event.target);
    this.props.dispatch(indexNav("/searchresult", "searchresult", {}));
  }

  _onSearchEnter (event) {
    console.log("Main: _onSearchEnter: event: ", event.target);
    console.log("Main: _onSearchEnter: event key: ", event.key);
    if(event.key === 'Enter') {
      this.props.dispatch(indexNav("/searchresult", "searchresult", {}));
    }
  }

  _onClick (event) {
    console.log("onClick: ", event.target.innerText);
    this.setState({text: event.target.innerText});

    if (event.target.innerText == MENU_LABELS.home) {

      this.props.dispatch(indexNav("/", "home"));

    } else if (event.target.innerText == MENU_LABELS.contacts) {

      this.props.dispatch(indexNav("/contacts", "contacts"));

    } else if (event.target.innerText == MENU_LABELS.content) {

      this.props.dispatch(indexNav("/content", "content"));

    }
  }

  render () {

    console.log("this.props.children: ", this.props.children);

    var searchBox =
            <div className="menu">
              <div className="ui search" >
                <div className="ui icon input">
                  <input className="prompt" placeholder="Search..." type="text" onChange={this._onChange}/>
                  <i className="search icon"></i>
                </div>
                <div className="results"></div>
              </div>
            </div>;
    
    return (
      <div>
        <div className="ui stackable menu">
          <a className="item">
            <i className="home icon"></i> <Link to="/">{MENU_LABELS.home}</Link>
          </a>
          <a className="item">
            <i className="mail icon"></i> <Link to="/messages">{MENU_LABELS.messages}</Link>
          </a>
          <a className="item">
            <i className="history icon"></i> <Link to="/activity">{MENU_LABELS.activity}</Link>
          </a>
          <div className="ui simple dropdown item">
            {MENU_LABELS.phase2}
            <i className="dropdown icon"></i>
            <div className="menu" onClick={this._onClick}>
              <a className="item"><i className="hourglass full icon"></i><Link to="/timeline">Timeline</Link></a>
              <a className="item"><i className="cloud icon"></i><Link to="/memories">Memories</Link></a>
              <a className="item"><i className="write icon"></i><Link to="/blogs">Blogs</Link></a>
              <a className="item"><i className="pie chart icon"></i><Link to="/events">Events</Link></a>
              <a className="item"><i className="calendar icon"></i><Link to="/calendar">Calendar</Link></a>
              <a className="item"><i className="setting icon"></i><Link to="/settings">System Settings</Link></a>
            </div>
          </div>
        </div>
        <div className="ui container">
          <div className="column">
            <a>
              <HSFileUpload caption="Upload Files" tag="generic"/>
            </a>
            <a className="ui icon fluid input">
              <i className="inverted circular search link icon" onClick={this._onSearchClick}></i>
              <input placeholder="Search..." type="text" onKeyPress={this._onSearchEnter}  onChange={this._onSearch}></input>
            </a>
          </div>
        </div>
        <div class="ui divider"></div>
        <div className="ui vertical stripe segment">
          <div>{this.props.children} </div>
        </div>

      </div>

    );

  }

};

module.exports = Main;