/**
 * Created by govind on 7/22/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import BookInfo from './bookinfo';
var HSFileUpload = require('../hsfileupload/hsfileupload');

// import List from 'grommet/components/List';
// import ListItem from 'grommet/components/ListItem';

// import {indexLoad, indexUnLoad, indexNextMore, indexAdd, indexNav} from '../../actions/indexactions';
import {documentsLoad, documentsNav, documentsNextMore, documentAdd, documentsUnLoad} from '../../actions/documentsactions';


class DigitalLibrary extends Component{

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
    console.log("Digitallibrary: _onChange: ", event.target.value);
    console.log("Digitallibrary: this.state: ", this.state);
    this.setState({search: event.target.value});
  }


  _onSearchClick (event) {
    console.log("Digitallibrary: _onSearchClick: event: ", event.target);
    console.log("Digitallibrary: _onSearchClick: this.state: ", this.state);


    this.props.dispatch(documentsLoad("digitallibrary", {search: this.state.search}));
  }

  _onSearchEnter (event) {
    console.log("Digitallibrary: _onSearchEnter: event: ", event.target);
    console.log("Digitallibrary: _onSearchEnter: event key: ", event.key);
    if(event.key === 'Enter') {
      this.props.dispatch(documentsLoad("digitallibrary", {search: this.state.search}));
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
      console.log("handleScroll DOWN so get more ahead documents: ", this.props.documents);
      // this.props.dispatch(documentsNextMore("digitallibrary", this.props.documents, {query: this.state.query}));
      this.props.dispatch(documentsNextMore("digitallibrary", this.props.documents, {}));
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
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // this.props.dispatch(indexLoad("digitallibrary", {}));
    console.log("DigitalLibrary: componentWillMount: category: ", this.props.category);
    console.log("DigitalLibrary: componentWillMount this.props.context: ", this.props.context);
    console.log("DigitalLibrary: componentWillMount: documents.context: ", this.props.documents.get('context'));

    let context = this.props.documents.get('context');
    this.props.dispatch(documentsLoad("digitallibrary", [{'directory': context.directory}, {'category': context.category}]));
  }

  componentWillUnmount() {
    console.log("digitallibrary componentWillUnmount");
    window.removeEventListener('scroll', this.handleScroll);
    this.props.dispatch(documentsUnLoad("digitallibrary", this.props.documents));

  }

  // _onAddBook() {
  //
  //   console.log("_onAddBook!!!!!");
  //   alert("Add books feature not implemented yet!");
  //
  // }

  onSelect(selection) {
    console.log("digitallibrary onSelect: ", selection);
    this.setState({ selection: selection});
  }

  onSubmit1 () {
    this.props.dispatch(documentAdd("digitallibrary", this.state));
  }

  render () {
    const { store } = this.context;
    console.log("digitallibrary this.props: ", this.props);
    const { selection } = this.state;
    var items = this.props.documents.get('result').get('items');
    let context = this.props.documents.getIn(['context']);
    console.log("digitallibrary context: ", context);

    let elements, detailsLayer;

    if(selection >= 0) {
      detailsLayer = (
        <BookInfo id={items[selection].id} data={items[selection]} view="fullview"  />
      );
    }
    else {
      elements = items.map((item, index) => {
        console.log("digitallibrary render item: ", item);
        console.log("digitallibrary render index: ", index);

        return (
          <div className="ui divided items">
            <BookInfo id={item.id} data={item} index={index} view='listview' onSelect={this.onSelect}/>
          </div>
        );
      });
    }

    console.log("elements: ", elements);
    // let tag = {'category': "digitallibrary", 'directory': context.directory};

    return (
      <div className="ui grid container">
        <div className="ui container">
          <div className="column">
            <a>
              <HSFileUpload caption="Upload Books" context={context}/>
            </a>
            <a className="ui icon fluid input">
              <i className="inverted circular search link icon" onClick={this._onSearchClick}></i>
              <input placeholder="Search books..." type="text" onKeyPress={this._onSearchEnter}  onChange={this._onSearchChange}></input>
            </a>
          </div>
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

DigitalLibrary.contextTypes = {
  store: PropTypes.object
};

DigitalLibrary.propTypes = {
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
const mapStateToProps = (state) => {
  const category = 'digitallibrary';
  console.log("digitallibrary mapStateToProps: state: ", state);

  return {
    category: category,
    documents: state.documents.getIn(['categories', category])

  };
};

export default connect(mapStateToProps)(DigitalLibrary);
