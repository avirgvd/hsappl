/**
 * Created by govind on 7/22/16.
 */
import React, {Component, PropTypes} from 'react';
// import Box from 'grommet/components/Box';
// import Meter from 'grommet/components/Meter';
// import Label from 'grommet/components/Label';
// import Value from 'grommet/components/Value';
// import Section from 'grommet/components/Section';
import FolderView from '../FolderView';
import { connect } from 'react-redux';
var Modal = require('react-modal');
import FinancialItem from './financialitem';

import {indexLoad, indexUnLoad, indexNextMore, showModal, indexAdd, indexNav} from '../../actions/indexactions';


class Financials extends Component{

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
    this.onMeterActive= this.onMeterActive.bind(this);
    this.onClick = this.onClick.bind(this);

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
    //   this.props.dispatch(indexNextMore("financials", this.props.index));
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
    this.props.dispatch(indexLoad("financials", {}));
    // this.props.dispatch(indexLoad("assettypes", {}));

  }

  componentWillUnmount() {
    console.log("financials componentWillUnmount");
    window.removeEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexUnLoad("financials", this.props.index));

  }

  _onAddAccount() {

    console.log("onAddAccount!!!!!");

    this.openModal();

  }

  onSelect(e) {
    console.log("financials onSelect: ", e);
    this.props.dispatch(indexNav("/assetinfo", "assetinfo", e));

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


    this.props.dispatch(indexNav("/financialitem", "financialitem", {item}));
  }


  onMeterActive(index) {
    console.log("active meter index: ", index);
  }


  ////////////start - MODAL DIALOG FUNCTIONS/////////////
  _showModal (show) {
    console.log('showing modal...');

    return (
      <Modal
        isOpen={show}
        onRequestClose={this.closeModal}>

        <div className="ui form" onSubmit={this.onSubmit1}>
          <div className="fields">
            <div className="field">
              <label>First Name</label>
              <input placeholder="First Name" type="text" onChange={this.onChangeFirstName}></input>
            </div>
            <div className="field">
              <label>Middle Name</label>
              <input placeholder="Middle Name" type="text" onChange={this.onChangeMiddleName}></input>
            </div>
            <div className="field">
              <label>Last Name</label>
              <input placeholder="Last Name" type="text" onChange={this.onChangeLastName}></input>
            </div>
            <div className="field">
              <label>eMail</label>
              <input placeholder="email" type="text" onChange={this.onChangeEmail}></input>
            </div>
          </div>
          <div className="ui submit button" onClick={this.onSubmit1}>Submit</div>
        </div>
      </Modal>    );
  }

  onSubmit1 () {
    this.props.dispatch(indexAdd("financials", this.state));
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

    this.props.dispatch(showModal("financials", {showModal: true}));
  }

  closeModal () {
    this.props.dispatch(showModal("financials", {showModal: false}));
  }
  ////////////end - MODAL DIALOG FUNCTIONS/////////////

  render () {
    const { store } = this.context;
    console.log("financials this.props: ", this.props);
    console.log("financials this.props: ", this.props.index.get('result').get('items'));

    var items = this.props.index.get('result').get('items');

    let bankaccounts = items.map((item, index) => {
      console.log("financials render item: ", item);
      console.log("financials render index: ", index);

      if(item.type == "saving" || item.type == "current"){

        return (

          <div className="ui inverted progress blue" id={item.id} onClick={this.onClick} >
            <div className="bar">
              <div className="progress" ></div>
            </div>
            <div className="label">{item.bankname + " A/C: " + item.accountnum}</div>
          </div>

        );

      }

    });

    let creditaccounts = items.map((item, index) => {
      console.log("financials render item: ", item);
      console.log("financials render index: ", index);

      if(item.type == "credit"){
        return (

          <div className="ui inverted progress blue" id={item.id} onClick={this.onClick} >
            <div className="bar">
              <div className="progress" ></div>
            </div>
            <div className="label">{item.bankname + " A/C: " + item.accountnum}</div>
          </div>

        );
      }

    });

    var showModal1 = this.props.index.get('showModal');
    console.log("ShowModal: ", showModal1);

    // var modal = this._showModal(this.props.index.get('showModal'));
    var modal;
    if( showModal1 === true) {
      console.log("ShowModal: true");
      modal = this._showModal(showModal1);
    }

    let totalsavings = 49422.00;
    let totalcredit = 5000.00;

    return(
      <div className="ui stacking container">
        <button className="ui basic button" onClick={this._onAddAccount}>
          <i className="icon user"></i>
          Add Account
        </button>


        <div>
          <div className="eight wide wide column">
            <h2 className="ui header">Saving Bank Account Balances</h2>
            <div className="ui inverted segment">
              {bankaccounts}
              <h4 className="ui header">Total Balance(Rs): {totalsavings.toFixed(2)}</h4>
            </div>
          </div>
          <div className="eight wide column">
            <h2 className="ui header">Credit Card Accounts Balances</h2>
            <div className="ui inverted teal segment">
              {creditaccounts}
              <h4 className="ui header">Total Balance(Rs): {totalcredit.toFixed(2)}</h4>
            </div>
          </div>
          {modal}
        </div>
      </div>

    );

  }
}

Financials.contextTypes = {
  store: PropTypes.object
};

Financials.propTypes = {
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
  const category = 'financials';
  console.log("financials mapStateToProps: state: ", state);

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};

export default connect(mapStateToProps)(Financials);
