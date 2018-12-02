/**
 * Created by govind on 8/12/17.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {indexLoad, indexUnLoad, indexNextMore, showModal, indexAdd, indexNav} from '../../actions/indexactions';
import {postRESTApi} from '../../Api';

class Settings extends Component{

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this._onAddAccount = this._onAddAccount.bind(this);
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
    // window.addEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexLoad("settings", {}));
    // this.props.dispatch(indexLoad("assettypes", {}));

  }

  componentWillUnmount() {
    console.log("settings componentWillUnmount");
    window.removeEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexUnLoad("settings", this.props.index));

  }

  _onAddAccount() {

    console.log("onAddAccount!!!!!", this.props.index.get('result').get('connectionUrls'));

    this.props.dispatch(indexNav("/cloudconnections", "cloudconnections", this.props.index.get('result').get('connectionUrls')));

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
              <p>{this.renderLabelValuesTable(item.items)}</p>
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
            <div className="ui right floated button" onClick={this._onAddAccount}>
              Add Connection
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
    console.log("settings this.props: URLs: ", this.props.index.get('result').get('connectionUrls'));
    console.log("settings this.props: settings: ", this.props.index.get('result').get('settings'));

    var items = this.props.index.get('result').get('settings');

    let elements = items.map((item, index) => {

      console.log("render: item: ", item);

      return(this.renderSettings(item));

    });

    return(
      <div className="ui stacking container">
        <button className="ui button" onClick={this._onAddAccount}>
          Add Account
        </button>
        <div className="ui items">
          {elements}
        </div>
      </div>
    );
  }
}


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
