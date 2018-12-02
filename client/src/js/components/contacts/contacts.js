/**
 * Created by govind on 7/22/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import ContactInfo from './contactinfo';

import {indexLoad, indexUnLoad, indexNextMore, indexAdd, indexNav} from '../../actions/indexactions';
import {postRESTApi} from '../../Api';


class Contacts extends Component{

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this._onAddFriend = this._onAddFriend.bind(this);

    this.onSelect = this.onSelect.bind(this);


    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.onAddContact = this.onAddContact.bind(this);
    this.state = {
      showAddContact: "no",
      showEditContact: "no",
      selection: -1,
      formdata: {}
    };
  }

  onAddContact(event) {

    this.setState({showAddContact: "yes"});

  }

  // The default HTML behaviour for form submit action should be avoided
  // This is achieved here using technique calleed "controlled components"
  // where a JS function handles the submission of form and has access to the data that the user entered into the form.
  //Ref: https://reactjs.org/docs/forms.html
  handleFormSubmit(event) {
    alert('A name was submitted: ' + this.state.directory);
    event.preventDefault();
    let reqBody = {category: "contacts", data: this.state.formdata};
    postRESTApi("/rest/add_1", reqBody);

    this.setState(
      {
        showAddContact: "no",
      }
    );
  }

  handleChange(event) {
    console.log("handleChange: target.name: ", event.target);
    console.log("handleChange: target.name: ", event.target.name);
    console.log("handleChange: target.value: ", event.target.value);

    let formdata = this.state.formdata;

    formdata[event.target.name] = event.target.value;

    console.log("handleChange: formdata: ", formdata)

    this.setState({formdata: formdata});

  }
  handleFormCancel(event) {
    this.setState(
      {
        showAddContact: "no",
      }
    );
  }



  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount() {
    
  }

  handleScroll(event) {

    const { showAddContact} = this.state;

    if(showAddContact === "no") {
      if (event.pageY === 0) {
        //if pageY == 0 the page is scrolled up to the TOP.
        // If previous items should be queried to server then this is that place
        console.log("handleScroll UP so get previous items");
        // this.props.dispatch(indexPrevMore("contacts"));
      } else if (event.pageY === event.view.scrollMaxY) {
        //if pageY == 0 the page is scrolled down to the END.
        // If next items should be queried to server then this is that place
        console.log("handleScroll DOWN so get more ahead index: ", this.props.index);
        this.props.dispatch(indexNextMore("contacts", this.props.index));
      }

      if (event.pageY === 0) {
        //if pageY == 0 the page is scrolled up to the TOP.
        // If previous items should be queried to server then this is that place
        console.log("handleScroll UP so get previous items");
        // this.props.dispatch(indexPrevMore("contacts"));
      } else if (event.pageY === event.view.scrollMaxY) {
        //if pageY == 0 the page is scrolled down to the END.
        // If next items should be queried to server then this is that place
        console.log("handleScroll DOWN so get more ahead index: ", this.props.index);
        this.props.dispatch(indexNextMore("contacts", this.props.index));
      }
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
    this.props.dispatch(indexLoad("contacts", {}));

  }

  componentWillUnmount() {

    console.log("contacts componentWillUnmount");
    window.removeEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexUnLoad("contacts", {}));

  }

  _onAddFriend() {

    console.log("onAddFriend!!!!!");

    this.setState({showAddContact: "yes"});

  }

  onSelect(selection) {
    console.log("contacts onSelect: ", selection);
    this.setState({ selection: selection});
  }


  render () {
    const { store } = this.context;
    console.log("contacts this.props: ", this.props);
    const { showAddContact } = this.state;
    const { selection } = this.state;
    console.log("Contacts:render: this.props: Selection: ", selection);

    var items = this.props.index.get('result').get('items');

    let elements;
    let createDialog;
    let contactdetails;

    if(showAddContact === "yes") {
      createDialog = (
        <form className="ui form" onSubmit={this.handleFormSubmit} on>
          <h1 className="ui header">Add Contact</h1>
          <div className="fields">
            <div className="field">
              <label>First name</label>
              <input name="firstname" placeholder="First name" type="text" onChange={this.handleChange}></input>
            </div>
            <div className="field">
              <label>Middle name</label>
              <input name="middlename" placeholder="Middle name" type="text" onChange={this.handleChange}></input>
            </div>
            <div className="field">
              <label>Last name</label>
              <input name="lastname" placeholder="Last name" type="text" onChange={this.handleChange}></input>
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <input name="email" type="text" onChange={this.handleChange}></input>
            <button className="ui icon button">
              <i className="cloud icon"></i>
            </button>
          </div>
          <div className="field">
            <label>Phone</label>
            <input name="phone" type="text" onChange={this.handleChange}></input>
          </div>
          <div className="field">
            <label>Address</label>
            <textarea rows="3" name="address" type="text" onChange={this.handleChange}></textarea>
          </div>
          <div className="field">
            <label>Notes</label>
            <textarea rows="2" name="notes" type="text" onChange={this.handleChange}></textarea>
          </div>
          <button className="ui primary button" type="submit">Add</button>
          <button className="ui button" onClick={this.handleFormCancel}>Cancel</button>
        </form>
      );
    }
    else {

      if(selection >= 0) {
        contactdetails = (
          <ContactInfo contactitem={items[selection]} view="fullview"  />
        );
      }
      else {
        elements = items.map((item, index) => {
          console.log("contacts render item: ", item);
          console.log("contacts render index: ", index);

          return (

            <div className="ui divided items">
              <ContactInfo index={index} data={item} view='listview' onSelect={this.onSelect}/>
            </div>
          );
        });
      }
    }

    console.log("elements: ", elements);

    return (
      <div className="ui container">
        <p>
          <button className="ui basic button" onClick={this._onAddFriend}>
            <i className="icon user"></i>
            Add Friend
          </button>
        </p>
        <div>
          {createDialog}
        </div>
        <div>{elements}</div>
        <div>{contactdetails}</div>
      </div>
    );
  }
}

Contacts.contextTypes = {
  store: PropTypes.object
};

Contacts.propTypes = {
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
  const category = 'contacts';
  console.log("contacts mapStateToProps: state: ", state);

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};

// module.exports = contacts;

export default connect(mapStateToProps)(Contacts);
