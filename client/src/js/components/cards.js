/**
 * Created by govind on 8/5/17.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {indexNav, indexLoad, indexUnLoad} from '../actions/indexactions';
import {getFileBaseURL, postRESTApi} from '../Api';

class Cards extends Component {

  constructor() {
    super();
    console.log("Cards");
    this.onTileClick= this.onTileClick.bind(this);
    this.onCreateDirectory= this.onCreateDirectory.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);

    this.state = {directory: ''};
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      showCreateDirectory: "no",
      directory: '',
      type:''
    };

  }

  onCreateDirectory(event) {

   this.setState({showCreateDirectory: "yes"});

  }

  // The default HTML behaviour for form submit action should be avoided
  // This is achieved here using technique calleed "controlled components"
  // where a JS function handles the submission of form and has access to the data that the user entered into the form.
  //Ref: https://reactjs.org/docs/forms.html
  handleFormSubmit(event) {
    alert('A name was submitted: ' + this.state.directory);
    event.preventDefault();
    this.setState({showCreateDirectory: "no"});
    let reqBody = {category: "directories", data: {name: this.state.directory, type: this.state.type}};
    postRESTApi("/rest/add_1", reqBody);

    this.setState(
      {
        showCreateDirectory: "no",
        directory: ''
      }
    );

  }

  handleChange(event) {
    this.setState({directory: event.target.value});
  }
  handleFormCancel(event) {
    this.setState(
      {
        showCreateDirectory: "no",
        directory: ''
      }
    );
  }


  onTileClick (event) {
    console.log("on tile click: ", event.target);
    console.log("on tile click: ", event.target.getAttribute('name'));
    console.log("on tile click query: ", event.target.getAttribute('data'));


    console.log("@@@@@@@Event: ", event);

    this.props.dispatch(indexNav(
      event.target.getAttribute('name'), 
      event.target.getAttribute('name'),
      null,
      {'directory': event.target.getAttribute('data')}
    ));

  }




  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    console.log("Cards: componentWillReceiveProps: ", nextProps);
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

    console.log("Cards: componentDidMount ", this.props.index);

    // Note: Cards pages loads based on the value set in resource attr.
    var resource = this.props.index.getIn(['resource']);
    console.log("Cards: componentDidMount resource", resource.type);

    this.setState({type: resource.category});
    // this.props.dispatch(indexLoad("photocards", this.props.index));
    this.props.dispatch(indexLoad("directories", resource));

  }


  render () {
    const { store } = this.context;

    const { showCreateDirectory } = this.state;


    console.log("cards showCreateDirectory: ", showCreateDirectory);
    console.log("cards this.props: ", this.props);
    console.log("cards this.props result: ", this.props.index.getIn(['result']));
    console.log("cards this.props: result->filters", this.props.index.getIn(['result']).getIn(['filters']));
    console.log("cards this.props: result->items", this.props.index.getIn(['result']).getIn(['items']));

    let elements;
    let createDialog;

    if(showCreateDirectory==="yes") {

      //Create Directory dialog should be displayed
      createDialog = (
      <form className="ui form" onSubmit={this.handleFormSubmit} on>
        <h1 className="ui header">Create Directory</h1>
        <div className="field">
          <label>Name</label>
          <input name="Name" type="text" onChange={this.handleChange}></input>
        </div>
        <button className="ui primary button" type="submit">Add</button>
        <button className="ui button" onClick={this.handleFormCancel}>Cancel</button>
        </form>
      );

    }
    else {
      var items = this.props.index.get('result').get('items');

      elements = items.map((item, index) => {
        console.log("Cards: render item: ", item);

        return(
          <div className="ui link card" name={item.category} >
            <div className="image" onClick={this.onTileClick}>
              <img src={ getFileBaseURL() + item.disp_imageid} className="ui fluid floated image" name={item.category} data={item.name}></img>
            </div>
            <div className="content" >
              <div className="header">{item.default_caption}</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
        );
      });
    }

    console.log("Cards: elements: ", elements);

    return (
      <div className="ui container">
        <div className="blue ui right floated button" onClick={this.onCreateDirectory}>+ Create Album</div>
        <div className="ui equal width center aligned padded grid" featureName="potos" >
          <div>
            {createDialog}
          </div>
          <div className="ui stackable cards" >
              {elements}
          </div>
        </div>
      </div>
    );
  }

};

Cards.contextTypes = {
  store: PropTypes.object
};

Cards.propTypes = {
  index: PropTypes.shape({
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    label: PropTypes.string,
    view: PropTypes.string.isRequired,
    result: {
      items: PropTypes.arrayOf(PropTypes.object),
    },
    addRoute: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  const category = 'directories';

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};


export default connect(mapStateToProps)(Cards);