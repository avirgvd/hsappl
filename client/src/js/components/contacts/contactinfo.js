/**
 * Created by govind on 7/23/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import hello from 'hellojs';
// import {} from '../../config/client_ids';


import {itemLoad, itemUnload, itemUpdate, itemDelete} from '../../actions/itemactions';

// var ContactInfo = React.createClass({
class ContactInfo extends Component {

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this.onOptionsClick = this.onOptionsClick.bind(this);
    this.renderListViewItem = this.renderListViewItem.bind(this);
    this.renderFullView = this.renderFullView.bind(this);
    this.onClickSocial = this.onClickSocial.bind(this);
    this.onSocialMatch = this.onSocialMatch.bind(this);
  }

  // getDefaultProps () {
  //
  //   return {
  //     id: "000",
  //     src: "jkjkjk",
  //     desc: 'Welcome home from props!'
  //   }
  // }

  // getInitialState: function () {
  //   return {
  //     key: 0,
  //     img_src: "",
  //     date: "",
  //     location: "",
  //     tags: "",
  //     desc: 'Welcome home from propsvvvvvvvvvvvvv!'
  //   }
  // },

  onSocialMatch(network, data) {

    console.log("onSocialMatch network: ", network);
    console.log("onSocialMatch data: ", data);
    this.props.dispatch(itemUpdate("contactinfo", "id", {[network]: contact}));

  }
  _onClick() {

    console.log("contactInfo onClick......");
    this.props.onSelect(this.props.data);

  }

  onOptionsClick(event) {
    console.log("onOptionsClick ", event.target.getAttribute('action'));
  //   The attribute 'action' in the menu item indicates the menu item action
    var action = event.target.getAttribute('action');

    if(action === 'delete') {
      // Delete the contact
      console.log("current data: ", this.props.contactitem1.get('result').get('item'));
      console.log("current data: ", this.props.contactitem1.get('result').get('item').id);
      var contactID = this.props.contactitem1.get('result').get('item').id;

      this.props.dispatch(itemDelete("contacts", {id: contactID}));

    }

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
    this.props.dispatch(itemLoad("contactinfo", {}));
  }


  componentWillUnmount () {

  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("photoframe:componentWillReceiveProps...nextProps: ", nextProps);
  //
  //   if (nextProps.category && this.props.category !== nextProps.category) {
  //     this.props.dispatch(itemUnload(this.props.index));
  //     this.props.dispatch(
  //       itemLoad(nextProps.category, nextProps.index, this.props.selection));
  //   }
  //
  // },

  render () {
    const { store } = this.context;

    console.log("item props: ", this.props);

    if (this.props.view === 'listview') {

      return this.renderListViewItem();

    } else if (this.props.view === 'slideview') {

      return this.renderSlideViewItem();

    } else {

      return this.renderFullView();

    }

  }

  renderListViewItem () {
    console.log("item listview props: ", this.props);

    return (
      <div className="ui card item" onClick={this._onClick}>
        <div className="image">
          <img ></img>
        </div>
        <div className="content">
          <a className="header">{this.props.data.firstname}  {this.props.data.middlename} {this.props.data.lastname}</a>
          <div className="meta">
            <span>Description</span>
          </div>
          <div className="description">
            <p>{this.props.data.email}</p>
          </div>
          <div className="extra">
            Additional Details
          </div>


        </div>
      </div>
    );
  }

  renderSlideViewItem () {


  }

  renderFullView () {
    // console.log("photoframe renderFullView props: ", this.props);
    var contact = this.props.contactitem1.get('result').get('item');
    console.log("contactinfo renderFullView contact: ", contact);

    return (


      <div className="ui grid container">
        <div className="content">
          <div className="ui red inverted segment">
            <div className="ui grid">
              <div className="four column row">
                <div className="left fourteen wide column"><h3>Contact Detail</h3></div>
                <div className="right two wide column">
                  <div className="ui simple dropdown item">
                    <i className="options icon"></i>
                    <div className="menu" onClick={this.onOptionsClick}>
                      <div className="item">
                        Edit
                      </div>
                      <div className="item">
                        Save
                      </div>
                      <div className="divider"></div>
                      <div className="item">
                        Export
                      </div>
                      <div className="item" action="delete">
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ui horizontal segments">
            <div className="ui segment">
              <img src="http://192.168.1.147:3000/d73a7b694dccfc2db24181063ccca0a5" className="ui aligned small circular image"></img>
              <h2>
                {contact.firstname}  {contact.middlename} {contact.lastname}
              </h2>
              </div>
            <div className="ui segment">
              <h3 className="ui segment">
                <div className="meta">
                  <span>Description</span>
                </div>
                <div className="description">
                  <p>{contact.email}</p>
                </div>
                <div className="extra">
                  Additional Details.........................................
                </div>
                <button className="ui google plus button" onClick={this.onClickSocial}>
                  <i className="google plus icon"></i>
                </button>
              </h3>
            </div>
          </div>
        </div>
      </div>


    );
  }

  onClickSocial () {
    console.log("onClickSocial");
    hello.init({
      google: "971270578758-mfmfamsug6d1iea5vad34ci767gprpgi.apps.googleusercontent.com"
    },{
      redirect_uri: 'http://192.168.1.147:3010/',
      scope: [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/contacts.readonly'
      ]
    });

    hello('google').login().then(function() {
      console.log('You are signed in to Google');

      //Now that the sign-in is through query Google contacts for matching contact
      // hello('google').api('me/contacts').then(function(json) {
      hello('google').api('me/contacts', 'get', {email: "jinsun76@gmail.com"}).then(function(json) {

        let contact = json.data.find((field) => {
          return field.email === "jinsun76@gmail.com";

        });
        console.log("Contact matched!!! : ", contact);
        console.log("Contact matched!!! props: ", this);
        this.onSocialMatch("google", data);
        console.log("Contact matched!!! ");

      }, function(e) {
        console.log('Whoops! ' + e.error.message);
        console.log('Whoops! ' + JSON.stringify(e));
      });


    }, function(e) {
      console.log('Signin error: ' + e.error.message);
    });

    hello.on('auth.login', function(auth) {
      console.log("hello.on auth: ", auth);
      console.log("hello.on auth: ", auth);

      // Call user information, for the given network
      hello(auth.network).api('me').then(function(r) {
        // Inject it into the container
        var label = document.getElementById('profile_' + auth.network);
        if (!label) {
          label = document.createElement('div');
          label.id = 'profile_' + auth.network;
          document.getElementById('profile').appendChild(label);
        }
        label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
      });
    });



  }


};

ContactInfo.contextTypes = {
  store: PropTypes.object
};

ContactInfo.propTypes = {
  contactitem1: PropTypes.shape({
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
  contactitem: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  const category = 'contactinfo';

  return {
    category: category,
    contactitem1: state.index.getIn(['categories', category])

  };
};


export default connect(mapStateToProps)(ContactInfo);

// module.exports = ContactInfo;