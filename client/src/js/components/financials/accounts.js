/**
 * Created by govind on 9/9/18.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
var HSFileUpload = require('../hsfileupload/hsfileupload');
// import List from 'grommet/components/List';
// import ListItem from 'grommet/components/ListItem';

import {accountsLoad, accountsAdd, accountsNextMore, accountsNav, accountsUnLoad} from '../../actions/accounts';

// Documents should support various account types like PDFs, MS Word, Spreadsheet, Image (PNG/JPG etc.), text files
class Accounts extends Component{

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    // this._onAddBook = this._onAddBook.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this._onSearchChange = this._onSearchChange.bind(this);
    this._onSearchClick = this._onSearchClick.bind(this);
    this._onSearchEnter = this._onSearchEnter.bind(this);

    this.state = {search: "", query: {}, selection: -1};

  }


  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount() {

  }

  _onSearchChange (event) {
    console.log("Accounts: _onChange: ", event.target.value);
    console.log("Accounts: this.state: ", this.state);
    this.setState({search: event.target.value});
  }


  _onSearchClick (event) {
    console.log("Accounts: _onSearchClick: event: ", event.target);
    console.log("Accounts: _onSearchClick: this.state: ", this.state);


    this.props.dispatch(accountsLoad(this.props.category, {search: this.state.search}));
  }

  _onSearchEnter (event) {
    console.log("Accounts: _onSearchEnter: event: ", event.target);
    console.log("Accounts: _onSearchEnter: event key: ", event.key);
    if(event.key === 'Enter') {
      this.props.dispatch(accountsLoad(this.props.category, {search: this.state.search}));
    }
  }


  handleScroll(event) {

    if (event.pageY === 0 ) {
      //if pageY == 0 the page is scrolled up to the TOP.
      // If previous items should be queried to server then this is that place
      console.log("handleScroll UP so get previous items");
    } else if (event.pageY === event.view.scrollMaxY) {
      //if pageY == 0 the page is scrolled down to the END.
      // If next items should be queried to server then this is that place
      console.log("handleScroll DOWN so get more ahead index: ", this.props.index);
      console.log("handleScroll DOWN context: ", context);
      // this.props.dispatch(indexNextMore("accounts", this.props.index, {query: this.state.query}));
      this.props.dispatch(accountsNextMore(this.props.category, this.props.index, [{'directory': context.directory}, {'category': context.category}]));
    }

  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps: ", nextProps);
    // if (nextProps.category && this.props.category !== nextProps.category) {
    //   this.props.dispatch(accountsUnLoad(this.props.index));
    //   this.props.dispatch(
    //     accountsLoad(nextProps.category, nextProps.index, this.props.selection));
    // }
  }

  /*
   * This function will be called after render()
   * It is good idea to perform any async operations here as render can show some default
   * content first and this function can asyncronously trigger render() when there is data
   * */
  componentWillMount() {
    console.log("Accounts: componentWillMount: props: ", this.props);

    this.props.dispatch(accountsLoad({}));
    window.addEventListener('scroll', this.handleScroll);

    // this.props.dispatch(accountsLoad("banking,creditcards,loans", [{'directory': context.directory}, {'category': context.category}]));
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    window.removeEventListener('scroll', this.handleScroll);
    // this.props.dispatch(accountsUnLoad("accounts", this.props.index));

  }

  onSelect(selection) {
    console.log("accounts onSelect: ", selection);
    this.setState({ selection: selection});
  }

  onSubmit1 () {
    this.props.dispatch(accountsAdd("accounts", this.state));
  }

  render () {

    console.log("accounts: render: ", this.props);

    var accounts = this.props.accounts.result.items;
    console.log("accounts: render: accounts: ", accounts);


    var items = (
      <div className="item">
        <i className="large github middle aligned icon"></i>
        <div className="content">
          <a className="header">ICICI Bank</a>
          <div className="description">Saving Account# 123664445</div>
          <div className="description">All fine...</div>
        </div>
      </div>
    );


    return (
      <div className="ui relaxed divided selection list">
        {items}
      </div>
    );
  }
}

Accounts.contextTypes = {
  store: PropTypes.object
};

Accounts.propTypes = {
  type: PropTypes.string.isRequired,
  
  accounts: PropTypes.shape({
    label: PropTypes.string,
    query: PropTypes.object,
    filter: PropTypes.object,
    result: {
      total: PropTypes.number,
      items: PropTypes.arrayOf(PropTypes.object),
    },
    view: PropTypes.oneOf(["table", "tiles", "list"]),
    addRoute: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

// for react-redux
const mapStateToProps = (state, props) => {

  console.log("Accounts: mapStateToProps: state: ", state);
  console.log("Accounts: mapStateToProps: props: ", props);

  return { accounts: state.accounts };

};

export default connect(mapStateToProps)(Accounts);
