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
    this._onAddFriend = this._onAddFriend.bind(this);
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

  }


  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount() {



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
      this.props.dispatch(indexNextMore("financials", this.props.index));
    }

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
    // this.props.dispatch(indexLoad("financials", {}));
    // this.props.dispatch(indexLoad("assettypes", {}));

  }

  componentWillUnmount() {
    console.log("financials componentWillUnmount");
    window.removeEventListener('scroll', this.handleScroll);
    // this.props.dispatch(indexUnLoad("financials", this.props.index));

  }

  _onAddFriend() {

    console.log("onAddFriend!!!!!");

    this.openModal();

  }

  onSelect(e) {
    console.log("financials onSelect: ", e);
    this.props.dispatch(indexNav("/assetinfo", "assetinfo", e));

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

    // var items = this.props.index.get('result').get('items');
    //
    // let elements = items.map((item, index) => {
    //   console.log("financials render item: ", item);
    //   console.log("financials render index: ", index);
    //
    //   return (
    //
    //     <div className="ui divided items">
    //       <FinancialItem id={item.id} data={item} view='listview' onSelect={this.onSelect}/>
    //     </div>
    //     );
    // });
    //
    // console.log("elements: ", elements);
    // var showModal1 = this.props.index.get('showModal');
    // console.log("ShowModal: ", showModal1);
    //
    // // var modal = this._showModal(this.props.index.get('showModal'));
    // var modal;
    // if( showModal1 === true) {
    //   console.log("ShowModal: true");
    //   modal = this._showModal(showModal1);
    // }

    // old semantic-ui code
    // return (
    //   <div className="ui grid container">
    //     <p>
    //       <button className="ui basic button" onClick={this._onAddFriend}>
    //         <i className="icon user"></i>
    //         Add Financial Item
    //       </button>
    //     </p>
    //
    //     <p>{elements}</p>
    //     {modal}
    //   </div>
    // );

    let totalsavings = 49422.00;
    let totalcredit = 5000.00;

    return(
      <div className="ui grid container">
        <div className="eight wide wide column">
        <h2 className="ui header">Saving Bank Account Balances</h2>
        <div className="ui inverted segment">
          <div className="ui inverted progress blue" id="citibank" >
            <div className="bar">
              <div className="progress" ></div>
            </div>
            <div className="label">Citibank</div>
          </div>
          <div className="ui inverted progress orange" id="icici">
            <div className="label">ICICI Bank</div>
            <div className="bar">
              <div className="progress"></div>
            </div>
          </div>
          <div className="ui inverted progress green" id="sbi">
            <div className="label">State Bank of India</div>
            <div className="bar">
              <div className="progress"></div>
            </div>
          </div>
          <div className="ui inverted progress yellow" id="sbm">
            <div className="label">State Bank of Mysore</div>
            <div className="bar">
              <div className="progress"></div>
            </div>
          </div>
          <h4 className="ui header">Total Balance(Rs): {totalsavings.toFixed(2)}</h4>
        </div>
        </div>
        <div className="eight wide column">
        <h2 className="ui header">Credit Card Accounts Balances</h2>
        <div className="ui inverted teal segment">
          <div className="ui inverted progress blue" id="citibank" >
            <div className="bar">
              <div className="progress" ></div>
            </div>
            <div className="label">Citibank Gold Card</div>
          </div>
          <div className="ui inverted progress orange" id="icici">
            <div className="label">ICICI Platinum Credit Card</div>
            <div className="bar">
              <div className="progress"></div>
            </div>
          </div>
          <h4 className="ui header">Total Balance(Rs): {totalcredit.toFixed(2)}</h4>
        </div>
        </div>
        <FolderView name="Financials..."></FolderView>

      </div>
    );
    // return (
    //   <Section primary={true} flex={true}>
    //   <Box>
    //     <Box>
    //       <Box direction="row" justify="between" align="center" responsive={false}>
    //         <Value value={50} units="GB" size="small" />
    //         <Label margin="none">
    //           Gen 7
    //         </Label>
    //       </Box>
    //       <Meter value={50} max={100} label={false} size="small" active={false} onActive={this.onMeterActive} />
    //     </Box>
    //     <Box>
    //       <Box direction="row" justify="between" align="center" responsive={false}>
    //         <Value value={20} units="GB" size="small" />
    //         <Label margin="none">
    //           Gen 8
    //         </Label>
    //       </Box>
    //       <Meter value={20} max={100} label={false} size="small" active={false} onActive={this.onMeterActive} />
    //     </Box>
    //     <Box>
    //       <Box direction="row" justify="between" align="center" responsive={false}>
    //         <Value value={10} units="GB" size="small" />
    //         <Label margin="none">
    //           Gen 9
    //         </Label>
    //       </Box>
    //       <Meter value={10} max={100} label={false} size="small" active={false} onActive={this.onMeterActive} />
    //     </Box>
    //     <Box>
    //       <Box direction="row" justify="between" align="center" responsive={false}>
    //         <Value value={30} units="GB" size="small" />
    //         <Label margin="none">
    //           Gen 10
    //         </Label>
    //       </Box>
    //       <Meter value={30} max={100} label={false} size="small" active={false} onActive={this.onMeterActive} />
    //     </Box>
    //     <Box direction="row" justify="between" responsive={false}>
    //       <Label size="small">
    //         0 GB
    //       </Label>
    //       <Label size="small">
    //         100 GB
    //       </Label>
    //     </Box>
    //   </Box>
    //   </Section>
    // );

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
