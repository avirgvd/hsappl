/**
 * Created by govind on 7/23/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {itemLoad, itemUnload} from '../../actions/itemactions';
var HSFileUpload = require('../hsfileupload/hsfileupload');


class FinancialItem extends Component {

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {

    console.log("FinancialItem onClick......");
    this.props.onSelect(this.props.data);

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
    this.props.dispatch(itemLoad("financialitem", {}));
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

    console.log("financialitem props: ", this.props);

    var account = this.props.financialitem1.get('result').get('item');
    console.log("financialitem render account: ", account);

    var statements = undefined;
    var otherdocuments = undefined;


    return (
      <div className="ui grid container">
        <div className="content">
          <h3 class="ui header">Account Details</h3>
          <a className="header">{account.item.bankname}  {account.item.accountnum} </a>
          <div className="meta">
            <span>Balance</span>
          </div>
          <div className="description">
            <p>{account.item.currency} {account.item.balance}</p>
          </div>
          <div className="extra">
            Additional Details
          </div>

          <div class="ui hidden divider"></div>
          <h3 class="ui header">Statements</h3>
          <a>
            <HSFileUpload caption="Upload statements" tag="bankstatements"/>
          </a>
          <div class="ui list">
            <div class="item">
              <i class="map marker icon"></i>
              <div class="content">
                <a class="header">January 2017</a>
                <div class="description">Statement for the month of January 2017.</div>
              </div>
            </div>
            <div class="item">
              <i class="map marker icon"></i>
              <div class="content">
                <a class="header">December 2016</a>
                <div class="description">Statement for the month of December 2016.</div>
              </div>
            </div>
            <div class="item">
              <i class="map marker icon"></i>
              <div class="content">
                <a class="header">November 2017</a>
                <div class="description">Statement for the month of November 2016.</div>
              </div>
            </div>
            <div class="item">
              <i class="map marker icon"></i>
              <div class="content">
                <a class="header">October 2016</a>
                <div class="description">Statement for the month of October 2016.</div>
              </div>
            </div>
          </div>

          <h3 class="ui header">Other Documents</h3>
          <a>
            <HSFileUpload caption="Upload other documents" tag="bankmiscdocs"/>
          </a>
          {otherdocuments}
        </div>
      </div>
    );
  }



};

FinancialItem.contextTypes = {
  store: PropTypes.object
};

FinancialItem.propTypes = {
  financialitem1: PropTypes.shape({
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
  financialitem: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {

  console.log("Financialitems mapStateToProps props: ", props);
  console.log("Financialitems mapStateToProps state: ", state.index.getIn(['categories', category])); 
  const category = 'financialitem';

  return {
    category: category,
    financialitem1: state.index.getIn(['categories', category])

  };
};


export default connect(mapStateToProps)(FinancialItem);

