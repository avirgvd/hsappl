/**
 * Created by govind on 7/22/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {indexLoad, indexUnLoad, indexNextMore, showModal, indexAdd, indexNav} from '../../actions/indexactions';


class Financials extends Component{

  constructor(props) {
    super(props);

    this._onAddAccount = this._onAddAccount.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.onClick = this.onClick.bind(this);

    this.state = {
      showAddAccountForm: "no",
      formdata: {}
    };

  }

  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount() {

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
    this.props.dispatch(indexLoad("financials", {}));
    // this.props.dispatch(indexLoad("assettypes", {}));

  }

  componentWillUnmount() {
    console.log("financials componentWillUnmount");
    this.props.dispatch(indexUnLoad("financials", this.props.index));

  }

  _onAddAccount() {

    console.log("onAddAccount!!!!!");
    this.setState({showAddAccountForm: "yes"});

  }

  // The default HTML behaviour for form submit action should be avoided
  // This is achieved here using technique calleed "controlled components"
  // where a JS function handles the submission of form and has access to the data that the user entered into the form.
  //Ref: https://reactjs.org/docs/forms.html
  handleFormSubmit(event) {
    alert('A name was submitted: ' + this.state.directory);
    event.preventDefault();
    this.setState({showAddAccountForm: "no"});
    let reqBody = {category: "financials", data: this.state.formdata};
    postRESTApi("/rest/add_1", reqBody);

    this.setState(
      {
        showAddAccountForm: "no"
      }
    );
  }

  handleChange(event) {

    let formdata = this.state.formdata;

    formdata[event.target.name] = event.target.value;

    console.log("handleChange: formdata: ", formdata)

    this.setState({formdata: formdata});
  }

  handleFormCancel(event) {
    event.preventDefault();
    this.setState(
      {
        showAddAccountForm: "no",
      }
    );
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


  render () {
    const { store } = this.context;
    const { showAddAccountForm } = this.state;

    console.log("financials this.props: ", this.props);
    console.log("financials showAddAccountForm: ", showAddAccountForm);

    var items = [];

    let addAcctDlg, bankaccounts, creditaccounts, finances;
    let totalsavings = 49422.00;
    let totalcredit = 5000.00;

    if(showAddAccountForm ==="yes") {

      // show add Account form
      addAcctDlg = (
        <div>
          <form className="ui form" onSubmit={this.handleFormSubmit} >
            <h1 className="ui header">Add Account</h1>
            <div className="field">
              <label>Account Name</label>
              <input name="accountname" type="text" onChange={this.handleChange}></input>
            </div>
            <div className="field">
              <label>Account Type</label>
              <select className="ui fluid dropdown">
                <option value="">Select...</option>
                <option value="savingbankaccount">Saving Account</option>
                <option value="creditcardaccount">Credit Card</option>
                <option value="loanaccount">Loan</option>
              </select>
            </div>
            <div className="field">
              <label>Bank Name</label>
              <input name="bankname" type="text" onChange={this.handleChange}></input>
            </div>
            <div className="field">
              <label>Account Number</label>
              <input name="accountnumber" type="text" onChange={this.handleChange}></input>
            </div>
            <div className="field">
              <label>Account Holder Name</label>
              <input name="accountholdername" type="text" onChange={this.handleChange}></input>
            </div>

            <button className="ui primary button" type="submit">Add</button>
            <button className="ui button" onClick={this.handleFormCancel}>Cancel</button>
          </form>
        </div>
      );

    }
    else {
      bankaccounts = items.map((item, index) => {
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

      creditaccounts = items.map((item, index) => {
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

      finances = (
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
        </div>
      );

    }





    return(
      <div className="ui stacking container">
        <button className="ui basic button" onClick={this._onAddAccount}>
          <i className="icon user"></i>
          Add Account
        </button>
        {addAcctDlg}
        {finances}
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
