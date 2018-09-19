/**
 * Created by govind on 7/22/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
var HSFileUpload = require('../hsfileupload/hsfileupload');
import DocumentView from './documentview';
// import List from 'grommet/components/List';
// import ListItem from 'grommet/components/ListItem';

import {documentsLoad, documentsNav, documentsNextMore, documentAdd, documentsUnLoad} from '../../actions/documentsactions';

// Documents should support various document types like PDFs, MS Word, Spreadsheet, Image (PNG/JPG etc.), text files
class Documents extends Component{

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
    console.log("Documents: _onChange: ", event.target.value);
    console.log("Documents: this.state: ", this.state);
    this.setState({search: event.target.value});
  }


  _onSearchClick (event) {
    console.log("Documents: _onSearchClick: event: ", event.target);
    console.log("Documents: _onSearchClick: this.state: ", this.state);


    this.props.dispatch(documentsLoad(this.props.category, {search: this.state.search}));
  }

  _onSearchEnter (event) {
    console.log("Documents: _onSearchEnter: event: ", event.target);
    console.log("Documents: _onSearchEnter: event key: ", event.key);
    if(event.key === 'Enter') {
      this.props.dispatch(documentsLoad(this.props.category, {search: this.state.search}));
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
      // this.props.dispatch(indexNextMore("documents", this.props.index, {query: this.state.query}));
      this.props.dispatch(documentsNextMore(this.props.category, this.props.index, {}));
    }

  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps: ", nextProps);
    if (nextProps.category && this.props.category !== nextProps.category) {
      this.props.dispatch(documentsUnLoad(this.props.index));
      this.props.dispatch(
        documentsLoad(nextProps.category, nextProps.index, this.props.selection));
    }
  }

  /*
   * This function will be called after render()
   * It is good idea to perform any async operations here as render can show some default
   * content first and this function can asyncronously trigger render() when there is data
   * */
  componentWillMount() {
    console.log("Documents: componentWillMount: ", this.props.category);
    window.addEventListener('scroll', this.handleScroll);
    this.props.dispatch(documentsLoad(this.props.category, {"category": this.props.category}));
  }
  // componentDidMount() {
  //   console.log("Documents: componentDidMount: ", this.props.category);
  //   window.addEventListener('scroll', this.handleScroll);
  //   this.props.dispatch(documentsLoad(this.props.category, {"category": this.props.category}));
  // }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    window.removeEventListener('scroll', this.handleScroll);
    this.props.dispatch(documentsUnLoad("documents", this.props.index));

  }

  // _onAddBook() {
  //
  //   console.log("_onAddBook!!!!!");
  //   alert("Add books feature not implemented yet!");
  //
  // }

  onSelect(selection) {
    console.log("documents onSelect: ", selection);
    this.setState({ selection: selection});
  }

  onSubmit1 () {
    this.props.dispatch(documentAdd("documents", this.state));
  }

  render () {
    const { store } = this.context;
    console.log("documents this.props: ", this.props);
    let category = this.props.category;
    let context = this.props.documents.getIn(['context']);
    console.log("documents context: ", context);
    const { selection } = this.state;
    var items = this.props.documents.get('result').get('items');

    let elements, detailsLayer;

    if(selection >= 0) {
      detailsLayer = (
        <Document id={items[selection].id} data={items[selection]} view="fullview"  />
      );
    }
    else {
      elements = items.map((item, index) => {
        console.log("documents render item: ", item);
        console.log("documents render index: ", index);

        return (
          <div className="ui divided items">
            <DocumentView id={item.id} data={item} index={index} view='listview' onSelect={this.onSelect}/>
          </div>
        );
      });
    }

    console.log("elements: ", elements);

    let tag = {'category': category, 'directory': context.directory};

    return (
      <div className="ui grid container">
        <div className="ui container">
          <div className="column">
            <a>
              <HSFileUpload caption="Upload Documents" context={tag}/>
            </a>
            <a className="ui icon fluid input">
              <i className="inverted circular search link icon" onClick={this._onSearchClick}></i>
              <input placeholder="Search documents..." type="text" onKeyPress={this._onSearchEnter}  onChange={this._onSearchChange}></input>
            </a>
          </div>
          <h2 className="ui header">{this.props.documents.get('label')} of ...</h2>


        </div>
        <div className="ui label">
          Total
          <div className="detail">{this.props.documents.get('result').get('total')}</div>
        </div>
        <p>{elements}</p>
        <div>
          {detailsLayer}
        </div>
      </div>

    );
  }
}

Documents.contextTypes = {
  store: PropTypes.object
};

Documents.propTypes = {
  type: PropTypes.string.isRequired,
  hosturl: PropTypes.string.isRequired,

  documents: PropTypes.shape({
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
const mapStateToProps = (state, props) => {
  const category = state.documents.getIn(['activeCategory']);
  console.log("documents mapStateToProps: state: ", state);
  // const category = state.route.pathname.split('/')[1];
  console.log("documents mapStateToProps: category: ", category);

  return {
    category: category,
    documents: state.documents.getIn(['categories', category])

  };
};

export default connect(mapStateToProps)(Documents);
