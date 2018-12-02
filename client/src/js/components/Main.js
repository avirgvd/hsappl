/**
 * Created by govind on 7/16/16.
 */

/*
 * This component is main component
 * This should include the application bar on top of the page
 *  * @type {*|exports|module.exports}
 */

import React, {Component, PropTypes} from 'react';

import {indexNav} from '../actions/indexactions';

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
    this.onMenuClick = this.onMenuClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSearchClick = this._onSearchClick.bind(this);
    this._onSearchEnter = this._onSearchEnter.bind(this);

    this.state = {text: "", selection: -1, sidebar: "visible"};

  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  _onChange (event) {
    console.log("Main: _onChange: ", event.target.value);
    console.log("Main: this.state: ", this.state);
    this.setState({text: event.target.value});
  }


  _onSearchClick (event) {
    console.log("Main: _onSearchClick: event: ", event.target);
    console.log("Main: _onSearchClick: this.state: ", this.state);


    this.props.dispatch(indexNav("search", "search", {search: this.state.text}));
  }

  _onSearchEnter (event) {
    console.log("Main: _onSearchEnter: event: ", event.target);
    console.log("Main: _onSearchEnter: event key: ", event.key);
    if(event.key === 'Enter') {
      this.props.dispatch(indexNav("/search", "search", {}));
    }
  }

  onMenuClick (event) {
    console.log("onClick: ", event.target.name);
    console.log("onClick: ", event.target.innerText);
    if(this.state.sidebar === 'visible')
      this.setState({sidebar: ""});
    else
      this.setState({sidebar: "visible"});
  }

  _onClick (event) {
    console.log("onClick: ", event.target.name);

    if (event.target.name == "home") {
      this.props.dispatch(indexNav("/", "home"));
    } else if (event.target.name == "messages") {
      this.props.dispatch(indexNav("/messages", "messages"));
    } else if (event.target.name == "activity") {
      this.props.dispatch(indexNav("/activity", "activity"));
    } else if (event.target.name == "phase2") {
      this.props.dispatch(indexNav("/phase2", "phase2"));
    }
  }

  render () {

    console.log("Main: render: this.props.children: ", this.props.children);

    var sidebar_className = "ui inverted left vertical sidebar menu " + this.state.sidebar;

    return(
      <div className="ui segments">
        <div className="ui blue inverted top attached demo menu segment" onClick={this.onMenuClick}>
          <a className="item">
            <i className="sidebar icon"></i>
            Menu
          </a>
        </div>
        <div className="ui bottom attached segment pushable">
          <div className={sidebar_className} width='wide' onClick={this._onClick}>
            <a className="item" name="home">
              <i className="home icon"></i>
              {MENU_LABELS.home}
            </a>
            <a className="item" name="messages">
              <i className="block layout icon"></i>
              {MENU_LABELS.messages}
            </a>
            <a className="item" name="activity">
              <i className="smile icon"></i>
              {MENU_LABELS.activity}
            </a>
            <a className="item" name="phase2">
              <i className="calendar icon"></i>
              {MENU_LABELS.phase2}
            </a>
          </div>
          <div className="pusher">
            <div className="ui blue inverted basic section">
              <div >
                <div className="ui breadcrumb">
                  <a className="active section">
                    <Link to="/">{MENU_LABELS.home}</Link>
                  </a>
                  <i className="right angle icon divider"></i>
                </div>
              </div>
              <p></p>
              <div>{this.props.children} </div>
            </div>
          </div>
        </div>
      </div>
    );

  }

};

module.exports = Main;