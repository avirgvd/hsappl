/**
 * Created by govind on 8/12/17.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
var Modal = require('react-modal');
// import authorize from './google';

// This dependency should soon be deleted
import hello from 'hellojs';

import GoogleLogin from 'react-google-login';

import {indexLoad, indexUnLoad, indexNextMore, showModal, indexAdd, indexNav} from '../../actions/indexactions';
import {postRESTApi} from '../../Api';

/**
 * The social network authentication is handled by hellojs https://adodson.com/hello.js/
 *
 */



class Settings extends Component{

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this._onAddAccount = this._onAddAccount.bind(this);
    this._showModal = this._showModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeMiddleName = this.onChangeMiddleName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onClickSocial= this.onClickSocial.bind(this);
    this.onClick = this.onClick.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);

  }


  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount() {



  }

  handleScroll(event) {

    // if (event.pageY === 0 ) {
    //   //if pageY == 0 the page is scrolled up to the TOP.
    //   // If previous items should be queried to server then this is that place
    //   console.log("handleScroll UP so get previous items");
    // } else if (event.pageY === event.view.scrollMaxY) {
    //   //if pageY == 0 the page is scrolled down to the END.
    //   // If next items should be queried to server then this is that place
    //   console.log("handleScroll DOWN so get more ahead index: ", this.props.index);
    //   this.props.dispatch(indexNextMore("settings", this.props.index));
    // }

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
    window.addEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexLoad("settings", {}));
    // this.props.dispatch(indexLoad("assettypes", {}));

  }

  componentWillUnmount() {
    console.log("settings componentWillUnmount");
    window.removeEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexUnLoad("settings", this.props.index));

  }

  _onAddAccount() {

    console.log("onAddAccount!!!!!");

    this.openModal();

  }

  onSelect(e) {
    console.log("settings onSelect: ", e);
    // this.props.dispatch(indexNav("/assetinfo", "assetinfo", e));
    // this.props.dispatch(indexNav("/assetinfo", "assetinfo", {}));

  }


  onClick(e) {
    console.log("bank clicked ", e.target.innerText);
    console.log("bank clicked ", e.target.id);

    var items = this.props.index.get('result').get('items');

    // Find the account item in the redux state and pass it to indexNav
    var item = items.find(function(currentitem){
      return currentitem.id == e.target.id;
    });

    console.log("bank clicked item: ", item);

    // this.props.dispatch(indexNav("/financialitem", "financialitem", {item}));
  }

  responseGoogle (response) {
    console.log("Response Google : ", response);

    if(response.hasOwnProperty('error') ) {
      console.log("Error signing in to Google: ", response.error);
      return;
    }

    postRESTApi('/rest/add', {'id': "12334", 'category': "accounts", 'item': response.code});

  }



  ////////////start - MODAL DIALOG FUNCTIONS/////////////
  _showModal (show) {
    console.log('showing modal...', show);

    return (
      <Modal
        isOpen={show}
        onRequestClose={this.closeModal}>

        <button className="ui facebook button">
          <i className="facebook icon"></i>
          Facebook
        </button>
        <button className="ui twitter button">
          <i className="twitter icon"></i>
          Twitter
        </button>
        <button className="ui google plus button" id='google' onClick={this.onClickSocial}>
          <i className="google plus icon"></i>
          Google Plus
        </button>
        <button className="ui vk button">
          <i className="vk icon"></i>
          VK
        </button>
        <button className="ui linkedin button">
          <i className="linkedin icon"></i>
          LinkedIn
        </button>
        <button className="ui instagram button">
          <i className="instagram icon"></i>
          Instagram
        </button>

      </Modal>    );
  }


  /*
  hellojs- requires oauth2_proxy to authenticate using providers like Google, Facebook etc.
  This proxy is required when login request includes property "response_code: 'code'"
  By default hellojs uses https://auth-server.herokuapp.com/proxy
  To use this proxy service I need to add this application client-ids and client secrets

  */

  //This function is not in use currently
  onClickSocial (e) {
    console.log("onClickSocial ", e.target.id);
    // return;

    var account = e.target.id;

    // if(account === 'google_new'){
    //
    // }

    if (account === 'google') {
      console.log("before hello.init");
      hello.init({
        google: "971270578758-mfmfamsug6d1iea5vad34ci767gprpgi.apps.googleusercontent.com"
      },{
        response_type:'code',
        scope: [
          'https://www.googleapis.com/auth/plus.me',
          'https://www.googleapis.com/auth/drive',
          'https://mail.google.com/',
          'https://www.googleapis.com/auth/drive.photos.readonly',
          'https://www.googleapis.com/auth/contacts.readonly'
        ]
      });
    }

    // hello('google').login().then(function() {
    hello(account).login({response_type: 'code'}).then(function() {
      console.log('You are signed in to Google');

      this.closeModal();


    }, function(e) {
      console.log('Signin error: ' + e.error.message);
    });

    hello.on('auth.login', function(auth) {
      console.log("hello.on auth: ", auth);

      postRESTApi('/rest/add', {'id': auth.network, 'category': "accounts", 'item': auth});

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

  onSubmit1 () {
    this.props.dispatch(indexAdd("settings", this.state));
  }

  onChangeFirstName (e) {
    console.log("on change firstname value ", e.target.value);
    this.setState({firstname: e.target.value});
  }
  onChangeMiddleName (e) {
    console.log("on change middle name value ", e.target.value);
    this.setState({middlename: e.target.value});
  }
  onChangeLastName (e) {
    console.log("on change lastname value ", e.target.value);
    this.setState({lastname: e.target.value});
  }
  onChangeEmail (e) {
    console.log("on change email value ", e.target.value);
    this.setState({email: e.target.value});
  }


  openModal () {

    this.props.dispatch(showModal("settings", {showModal: true}));
  }

  closeModal () {
    this.props.dispatch(showModal("settings", {showModal: false}));
  }
  ////////////end - MODAL DIALOG FUNCTIONS/////////////

  renderLabelValuesTable(labelvals) {

  }

  renderSettings (item) {

    if(item.id === "generalsettings") {

      return (
        <div className="item">
          <div className="ui small image">
            <img src=""></img>
          </div>
          <div className="middle aligned content">
            <div className="header">
              {item.category}
            </div>
            <div className="description">
              <p>{JSON.stringify(item)}</p>
            </div>
            <div className="extra">
              <div className="ui right floated button">
                Action
              </div>
            </div>
          </div>
        </div>
      );

    }
    else if(item.id === "storagesettings") {
      return (
      <div className="item">
        <div className="ui small image">
          <img src=""></img>
        </div>
        <div className="middle aligned content">
          <div className="header">
            {item.category}
          </div>
          <div className="description">
            <p>{JSON.stringify(item)}</p>
          </div>
          <div className="extra">
            <div className="ui right floated button">
              Action
            </div>
          </div>
        </div>
      </div>
      );
    }
    else if(item.id === "socialnetworks") {
      return (
      <div className="item">
        <div className="ui small image">
          <img src=""></img>
        </div>
        <div className="middle aligned content">
          <div className="header">
            {item.category}
          </div>
          <div className="description">
            <p>{JSON.stringify(item)}</p>
          </div>
          <div className="extra">
            <div className="ui right floated button">
              Action
            </div>
          </div>
        </div>
      </div>
      );
    }

  }

  render () {
    const { store } = this.context;
    console.log("settings this.props: ", this.props);
    console.log("settings this.props: ", this.props.index.get('result').get('items'));

    var items = this.props.index.get('result').get('items');

    // let elements = this.props.index.result.items.map((item, index) => {

    let elements = items.map((item, index) => {

      console.log("render: item: ", item);

      return(this.renderSettings(item));

    });

    var showModal1 = this.props.index.get('showModal');
    console.log("ShowModal: ", showModal1);

    // var modal = this._showModal(this.props.index.get('showModal'));
    var modal;
    if( showModal1 === true) {
      console.log("ShowModal: ", showModal1);
      modal = this._showModal(showModal1);
    }

    return(
      <div className="ui stacking container">
        <button className="ui button" onClick={this._onAddAccount}>
          Add Account
        </button>
        {modal}

        <div className="ui items">
          {elements}
        </div>

        <GoogleLogin
          clientId="971270578758-mfmfamsug6d1iea5vad34ci767gprpgi.apps.googleusercontent.com"
          buttonText="Google"
          responseType="code"
          scope="https://www.googleapis.com/auth/plus.me
            https://www.googleapis.com/auth/drive
            https://www.googleapis.com/auth/gmail.modify
            https://www.googleapis.com/auth/drive.photos.readonly
            https://www.googleapis.com/auth/contacts.readonly"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      </div>

    );

  }
}


// 4/e5Dgj2cKwlsEvk3wJ3wzpExPzLtnQh9V5bOf_03b9Cc
// 4/yU4cQZTMnnMtetyFcIWNItG32eKxxxgXXX-Z4yyJJJo.4qHskT-UtugceFc0ZRONyF4z7U4UmAI

Settings.contextTypes = {
  store: PropTypes.object
};

Settings.propTypes = {
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
  const category = 'settings';
  console.log("settings mapStateToProps: state: ", state);

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};

export default connect(mapStateToProps)(Settings);
