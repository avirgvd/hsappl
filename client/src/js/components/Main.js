/**
 * Created by govind on 7/16/16.
 */

/*
 * This component is main component
 * This should include the application bar on top of the page
 *  * @type {*|exports|module.exports}
 */


//import React from 'react';
//import {Link} from 'react-router';
//import HSFileUpload from './hsfileupload/hsfileupload';
import React, {Component, PropTypes} from 'react';
// import Button from 'grommet/components/Button';
// import Title from 'grommet/components/Title';
// import Anchor from 'grommet/components/Anchor';
// import Menu from 'grommet/components/Menu';
// import Article from 'grommet/components/Article';
// import Header from 'grommet/components/Header';
// import Search from 'grommet/components/Search';
// import UserSettings from 'grommet/components/icons/base/UserSettings';
// import Notification from 'grommet/components/icons/base/Notification';
// import MenuIcon from 'grommet/components/icons/base/Menu';
// import CloseIcon from 'grommet/components/icons/base/Close';
// import Section from 'grommet/components/Section';
// import Sidebar from 'grommet/components/Sidebar';
// import Split from 'grommet/components/Split';

import {indexLoad, indexUnLoad, indexNextMore, showModal, indexAdd, indexNav} from '../actions/indexactions';


// var React = require('react');
var Link = require('react-router').Link;
var HSFileUpload = require('./hsfileupload/hsfileupload');


var MENU_LABELS = {
  home: 'Home',
  contacts: 'Contacts',
  assets: 'Assets',
  browse: 'Browse',
  messages: 'Messages',
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
//
//
// var Main = React.createClass({

  constructor () {
    super();
    this._onClick = this._onClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onSearchClick = this._onSearchClick.bind(this);

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
  }

  _onClick (event) {
    console.log("onClick: ", event.target.innerText);
    this.setState({text: event.target.innerText});

    if (event.target.innerText == MENU_LABELS.home) {

      this.props.dispatch(indexNav("/", "home", event));

    } else if (event.target.innerText == MENU_LABELS.contacts) {

      this.props.dispatch(indexNav("/contacts", "contacts", event));

    } else if (event.target.innerText == MENU_LABELS.content) {

      this.props.dispatch(indexNav("/content", "content", event));

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
              <HSFileUpload/>
            </a>
            <a className="ui icon fluid input">
              <i className="search icon"></i>
              <input placeholder="Search..." type="text" onSelect={this._onSearchClick} onChange={this._onSearch}></input>
            </a>
          </div>
        </div>
        <div class="ui divider"></div>
        <div className="ui vertical stripe segment">
          <div>{this.props.children} </div>
        </div>

      </div>

    );
    // return (
    //   <div>
    //     <div className="ui stackable menu">
    //       <a className="item">
    //         <i className="home icon"></i> <Link to="/">{MENU_LABELS.home}</Link>
    //       </a>
    //       <a className="item">
    //         <i className="user icon"></i><Link to="/contacts">{MENU_LABELS.contacts}</Link>
    //       </a>
    //       <a className="item">
    //         <i className="grid layout icon"></i><Link to="/browse">{MENU_LABELS.browse}</Link>
    //       </a>
    //       <a className="item">
    //         <i className="mail icon"></i> <Link to="/messages">{MENU_LABELS.messages}</Link>
    //       </a>
    //       <div className="ui simple dropdown item">
    //         {MENU_LABELS.content}
    //         <i className="dropdown icon"></i>
    //         <div className="menu" onClick={this._onClick}>
    //           <a className="item"><i className="camera retro icon"></i><Link to="/photos">{MENU_LABELS.photos}</Link></a>
    //           <a className="item"><i className="book icon"></i><Link to="/digitallibrary">{MENU_LABELS.digitallib}</Link></a>
    //           <a className="item"><i className="pie chart icon"></i><Link to="/financials">{MENU_LABELS.financials}</Link></a>
    //           <a className="item"><i className="cubes icon"></i><Link to="/medical">{MENU_LABELS.medical}</Link></a>
    //           <a className="item"><i className="cubes icon"></i><Link to="/travel">{MENU_LABELS.travel}</Link></a>
    //           <a className="item"><i className="cubes icon"></i><Link to="/assets">{MENU_LABELS.assets}</Link></a>
    //           <a className="item"><i className="cubes icon"></i><Link to="/unknown">{MENU_LABELS.unknown}</Link></a>
    //         </div>
    //       </div>
    //       <div className="ui simple dropdown item">
    //         {MENU_LABELS.phase2}
    //         <i className="dropdown icon"></i>
    //         <div className="menu" onClick={this._onClick}>
    //           <a className="item"><i className="hourglass full icon"></i><Link to="/timeline">Timeline</Link></a>
    //           <a className="item"><i className="cloud icon"></i><Link to="/memories">Memories</Link></a>
    //           <a className="item"><i className="write icon"></i><Link to="/blogs">Blogs</Link></a>
    //           <a className="item"><i className="pie chart icon"></i><Link to="/events">Events</Link></a>
    //           <a className="item"><i className="calendar icon"></i><Link to="/calendar">Calendar</Link></a>
    //           <a className="item"><i className="setting icon"></i><Link to="/settings">System Settings</Link></a>
    //         </div>
    //       </div>
    //       <div className="right item">
    //         <div className="ui input"><input placeholder="Search..." type="text"/></div>
    //       </div>
    //     </div>
    //     <div className="ui container">
    //       <div className="column">
    //         <a>
    //           <HSFileUpload/>
    //         </a>
    //         <a className="ui icon fluid input">
    //           <i className="search icon"></i>
    //           <input placeholder="Search..." type="text" onSelect={this._onSearchClick} onChange={this._onSearch}></input>
    //         </a>
    //       </div>
    //     </div>
    //     <div class="ui divider"></div>
    //     <div className="ui vertical stripe segment">
    //       <div>{this.props.children} </div>
    //     </div>
    //
    //   </div>
    //
    // );


    //return (
    //  <div className='main-container'>
    //    <div className="ui inverted stackable menu">
    //      <a className="item active">
    //        Home
    //      </a>
    //      {featuresMenu}
    //      <a className="item">
    //        More Features
    //      </a>
    //      {searchBox}
    //    </div>
    //    <div className="ui segment">
    //      <p>This is UI segment</p>
    //    </div>
    //      {this.props.children}
    //      {this.state.text}
    //    </div>
    //);
  }
// });
};

module.exports = Main;