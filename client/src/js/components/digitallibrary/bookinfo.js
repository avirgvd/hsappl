/**
 * Created by govind on 7/23/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

// import Box from 'grommet/components/Box';
// import Anchor from 'grommet/components/Anchor';
// import NextIcon from 'grommet/components/icons/base/Next';
// import PrevIcon from 'grommet/components/icons/base/Previous';
// import Label from 'grommet/components/Label';
// import NumberInput from 'grommet/components/NumberInput';
// import Image from 'grommet/components/Image';
// import Card from 'grommet/components/Card';
import {itemLoad, itemUnload} from '../../actions/itemactions';
import {filesServerBaseURL} from '../../Api';

var PDF = require('react-pdf');

class BookInfo extends Component {

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this.renderListViewItem = this.renderListViewItem.bind(this);
    this.renderFullView = this.renderFullView.bind(this);
    this._onDocumentCompleted = this._onDocumentCompleted.bind(this);
    this._onPageCompleted = this._onPageCompleted.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.onBookViewMode = this.onBookViewMode.bind(this);

    this.state = {
      currentPage: 1,
      pages: 0,
      bookViewMode: "Lite Mode",
    };
  }

  // getDefaultProps () {
  //
  //   return {
  //     id: "000",
  //     src: "jkjkjk",
  //     desc: 'Welcome home from props!'
  //   }
  // }

  // getInitialState: function () {
  //   return {
  //     key: 0,
  //     img_src: "",
  //     date: "",
  //     location: "",
  //     tags: "",
  //     desc: 'Welcome home from propsvvvvvvvvvvvvv!'
  //   }
  // },

  _onClick() {
    console.log("BookInfo onClick......");

    this.props.onSelect(this.props.data);

  }

  _onDocumentCompleted(pages){
    console.log("_onDocumentCompleted pages: ", pages);

    this.setState({pages: pages});

  }

  _onPageCompleted(page){
    console.log("_onPageCompleted pages: ", pages);

    this.setState({currentPage: page});

  }

  prevPage(ev) {
    console.log("prev: ");

    ev.preventDefault();
    this.setState({
      currentPage: this.state.currentPage > 1 ? this.state.currentPage - 1 : 1
    });
    console.log("prev: ", this.state);
  }

  nextPage(ev) {
    console.log("next: ");

    ev.preventDefault();
    this.setState({
      currentPage: this.state.currentPage < this.state.pages ? this.state.currentPage + 1 : this.state.pages
    });

    console.log("next: ", this.state);

  }

  onBookViewMode(ev) {

    if(this.state.bookViewMode === "Lite Mode") {
      this.setState({bookViewMode: "Full Mode"});
    } else {
      this.setState({bookViewMode: "Lite Mode"});
    }

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
    this.props.dispatch(itemLoad("bookinfo", {}));
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

    console.log("item props: ", this.props);

    if (this.props.view === 'listview') {

      return this.renderListViewItem();

    } else if (this.props.view === 'slideview') {

      return this.renderSlideViewItem();

    } else {

      return this.renderFullView();

    }

  }

  renderListViewItem () {
    console.log("item listview props: ", this.props);
    console.log("item listview props: ", this.props.data.pdfmeta);
    // var thubmailUrl = filesServerBaseURL() + this.props.data.meta.thumbnail;

    var bucket = "docs";

   return (

        <div className="ui divided items" onClick={this._onClick}>
          <div className="item">
            <div className="ui tiny image">
              <img src={filesServerBaseURL() + bucket + "/" + this.props.data.id + '/?size=small'} onClick={this._onClickImage}/>
            </div>
            <div className="content">
              <a className="header">{this.props.data.originalname}</a>
              <div className="meta">
                <p>Author: {this.props.data.pdfmeta.Author}</p>
                <p>Created By: {this.props.data.pdfmeta.Creator}</p>
                <p>Produced By: {this.props.data.pdfmeta.Producer}</p>
              </div>
              <div className="description">
                <p>{JSON.stringify(this.props.data.pdfmeta)}</p>
              </div>
              <div className="extra">
              </div>
            </div>
          </div>
        </div>
    );
  }

  renderSlideViewItem () {


  }

  renderFullView () {
    // console.log("photoframe renderFullView props: ", this.props);
    var book = this.props.bookinfo1.get('result').get('items');
    console.log("bookinfo renderFullView bookinfo: ", book);
    console.log("bookinfo renderFullView state: ", this.state);

    var bucket = "docs";

    let pdf = <div className="ui container"><h3>Full mode not supported...</h3></div>;

    if (this.state.bookViewMode == "Lite Mode"){
      pdf = (
        <PDF file={filesServerBaseURL() + bucket + "/" + book.id}
            page={this.state.currentPage}
            scale={2}
            onDocumentComplete={this._onDocumentCompleted}
            onPageComplete={this._onPageComplete}>
        </PDF>
      );
    }

    return(
      <div className="ui grid container">
        <div>
          <button className="ui left labeled icon button" onClick={this.prevPage}>
            <i className="left arrow icon"></i>
            Prev
          </button>
          <button className="ui right labeled icon button"  onClick={this.nextPage}>
            <i className="right arrow icon"></i>
            Next
          </button>
        </div>
        <div className="ui labeled action input">
          <div className="ui label">
            Page:
          </div>
          <input size={2} value={this.state.currentPage} type="text"></input>
          <div className="ui label">
            of {this.state.pages} pages
          </div>
        </div>
        <button className="ui toggle button" onClick={this.onBookViewMode}>{this.state.bookViewMode}</button>
        {pdf}
      </div>

    );
  }

};

BookInfo.contextTypes = {
  store: PropTypes.object
};

BookInfo.propTypes = {
  bookinfo1: PropTypes.shape({
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
  bookinfo: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  console.log("bookinfo mapStateToProps state: ", state);
  
  const category = 'bookinfo';

  return {
    category: category,
    bookinfo1: state.index.getIn(['categories', category])

  };
};


export default connect(mapStateToProps)(BookInfo);

