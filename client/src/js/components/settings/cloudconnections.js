/**
 * Created by govind on 11/5/17.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
var Modal = require('react-modal');
// import authorize from './google';

import {indexLoad, showModal, indexAdd} from '../../actions/indexactions';
import {postRESTApi} from '../../Api';

class CloudConnections extends Component{

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
    // this.onClickSocial= this.onClickSocial.bind(this);
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
    // window.addEventListener('scroll', this.handleScroll);
    // this.props.dispatch(indexLoad("cloudconnections", {}));
    // this.props.dispatch(indexLoad("assettypes", {}));

  }

  componentWillUnmount() {
    console.log("CloudConnections componentWillUnmount");
    window.removeEventListener('scroll', this.handleScroll);
    // this.props.dispatch(indexUnLoad("cloudconnections", this.props.index));

  }

  _onAddAccount() {

    console.log("onAddAccount!!!!!");

    this.openModal();

  }

  onSelect(e) {
    console.log("CloudConnections onSelect: ", e);
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
  _showModal (show, network_urls) {
    console.log('showing modal...', show);
    console.log('showing modal network_urls: ', network_urls);

    return (
      <Modal
        isOpen={show}
        onRequestClose={this.closeModal}>

        <div className="ui stacking container">
          <h1 className="ui header">Choose the network to sign-in</h1>

          <button className="ui facebook disabled button">
            <i className="facebook icon"></i>
            Facebook
          </button>
          <div className="ui divider"></div>
          <button className="ui twitter  disabled button">
            <i className="twitter icon"></i>
            Twitter
          </button>
          <div className="ui divider"></div>
          <button className="ui google plus button" id='google'>
            <i className="google plus icon" ></i>
            Google Plus
          </button>
          <a href={network_urls[0]} target="_blank" >Go</a>
          <div className="ui divider"></div>
          <button className="ui vk disabled button">
            <i className="vk icon"></i>
            VK
          </button>
          <div className="ui divider"></div>
          <button className="ui linkedin disabled button">
            <i className="linkedin icon"></i>
            LinkedIn
          </button>
          <div className="ui divider"></div>
          <button className="ui instagram disabled button">
            <i className="instagram icon"></i>
            Instagram
          </button>

        </div>

      </Modal>    );
  }


  onSubmit1 () {
    this.props.dispatch(indexAdd("CloudConnections", this.state));
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
    this.props.dispatch(showModal("CloudConnections", {showModal: true}));
  }

  closeModal () {
    this.props.dispatch(showModal("CloudConnections", {showModal: false}));
  }
  ////////////end - MODAL DIALOG FUNCTIONS/////////////

  renderLabelValuesTable(labelvals) {
    console.log("renderLabelValuesTable fgdffddf");
    console.log("renderLabelValuesTable ", JSON.stringify(labelvals));

    var elements = labelvals.map((item, index) => {

      console.log("item: ", JSON.stringify(item));


      var varname = "";

      // IMP:
      // Parse JSON to find label and value like for example
      // JSON = {"hostname":"MyHomeServer"} then the table should be populated with
      // "hostname" in col1 and "MyHomeServer" in col2
      // replace below code when better code is found
      for (varname in item) {
        console.log(varname);
        console.log(item[varname]);
      }

      return(
        <tr>
          <td>{varname}</td>
          <td>{item[varname]}</td>
          <td className="right aligned"><button className="ui right icon button">
            <i className="right arrow icon"></i>
          </button></td>
        </tr>
      );

    });

    console.log("elements: ", elements);


    return (
      <table className="ui striped table">
        <tbody>
        {elements}
        </tbody>
      </table>
    );

  }

  render () {
    const { store } = this.context;
    console.log("CloudConnections this.props: ", this.props);
    console.log("CloudConnections this.props: items", this.props.index.get('result').get('items'));

    var items = this.props.index.get('result').get('items');
    console.log("items[0] ", items[0]);

    let elements = items.map((item, index) => {
      console.log(item);

    });

    var showModal1 = this.props.index.get('showModal');
    console.log("ShowModal: ", showModal1);

    // var modal = this._showModal(this.props.index.get('showModal'));
    var modal;
    if( showModal1 === true) {
      console.log("ShowModal: ", showModal1);
      modal = this._showModal(showModal1, this.props.index.get('result').get('connectionUrls'));
    }

    return(
      <div className="ui stacking container">
        <button className="ui button" onClick={this._onAddAccount}>
          Add Account
        </button>
        <div className="ui items">
          <div className="ui stacking container">
            <h1 className="ui header">Choose the network to sign-in</h1>

            <button className="ui facebook disabled button">
              <i className="facebook icon"></i>
              Facebook
            </button>
            <div className="ui divider"></div>
            <button className="ui twitter  disabled button">
              <i className="twitter icon"></i>
              Twitter
            </button>
            <div className="ui divider"></div>
            <button className="ui google plus button" id='google'>
              <i className="google plus icon" ></i>
              Google Plus
            </button>
            <a href={items[0]} target="_blank" >Go</a>
            <div className="ui divider"></div>
            <button className="ui vk disabled button">
              <i className="vk icon"></i>
              VK
            </button>
            <div className="ui divider"></div>
            <button className="ui linkedin disabled button">
              <i className="linkedin icon"></i>
              LinkedIn
            </button>
            <div className="ui divider"></div>
            <button className="ui instagram disabled button">
              <i className="instagram icon"></i>
              Instagram
            </button>

          </div>

        </div>
      </div>
    );
  }
}


CloudConnections.contextTypes = {
  store: PropTypes.object
};

CloudConnections.propTypes = {
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
  const category = 'cloudconnections';
  console.log("CloudConnections mapStateToProps: state: ", state);

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};

export default connect(mapStateToProps)(CloudConnections);
