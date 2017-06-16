/**
 * Created by govind on 11/25/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {itemLoad, itemUnload} from '../../actions/itemactions';

var PDF = require('react-pdf');

class MessageItem extends Component {

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this.renderListViewItem = this.renderListViewItem.bind(this);
    this.renderFullView = this.renderFullView.bind(this);
    this._onDocumentCompleted = this._onDocumentCompleted.bind(this);
    this._onPageCompleted = this._onPageCompleted.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);

    this.state = {
      currentPage: 1,
      pages: 0,
    };
  }

  _onClick() {

    console.log("MessageItem onClick......");
    this.props.onSelect(this.props.data);

  }

  _onDocumentCompleted(pages){
    console.log("_onDocumentCompleted pages: ", pages);

    this.setState({pages: pages});

  }

  _onPageCompleted(page){

    this.setState({currentPage: page});

  }

  prevPage(ev) {
    ev.preventDefault();
    this.setState({
      currentPage: this.state.currentPage > 1 ? this.state.currentPage - 1 : 1
    });
  }

  nextPage(ev) {
    ev.preventDefault();
    this.setState({ currentPage: this.state.currentPage < this.state.pages ? this.state.currentPage + 1 : this.state.pages });
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
    this.props.dispatch(itemLoad("MessageItem", {}));
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
    console.log("item listview props: ", this.props.data.meta);
    var thubmailUrl = 'http://192.168.1.147:3000/' + this.props.data.meta.thumbnail;

    // return (
    //
    //     <Card direction="row" thumbnail={<Image src={thubmailUrl} size="small"></Image>} heading={this.props.data.originalname}  onClick={this._onClick}>
    //           <div className="meta">
    //             <p>Author: {this.props.data.meta.Author}</p>
    //             <p>Created By: {this.props.data.meta.Creator}</p>
    //             <p>Produced By: {this.props.data.meta.Producer}</p>
    //           </div>
    //           <div className="description">
    //             <p>{JSON.stringify(this.props.data.meta)}</p>
    //           </div>
    //           <div className="extra">
    //           </div>
    //     </Card>
    // );
    return (

      <div className="ui divided items" onClick={this._onClick}>
        <div className="item">
          <div className="ui tiny image">
            <img src={'http://192.168.1.147:3000/' + this.props.data.meta.thumbnail}></img>
          </div>
          <div className="content">
            <a className="header">{this.props.data.originalname}</a>
            <div className="meta">
              <p>Author: {this.props.data.meta.Author}</p>
              <p>Created By: {this.props.data.meta.Creator}</p>
              <p>Produced By: {this.props.data.meta.Producer}</p>
            </div>
            <div className="description">
              <p>{JSON.stringify(this.props.data.meta)}</p>
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
    var book = this.props.messageItem1.get('result').get('item');
    console.log("messageItem renderFullView messageItem: ", book);
    console.log("messageItem renderFullView state: ", this.state);

    // return (
    //   <Box>
    //     <Anchor href="" icon={<PrevIcon />} label="Prev" reverse={true}  onClick={this.prevPage} />
    //     <Anchor href="" icon={<NextIcon />} label="Next" reverse={true}  onClick={this.prevPage} />
    //     <div direction="row">
    //       <Label>Page: </Label>
    //       <NumberInput value={this.state.currentPage}  />
    //       <Label>of {this.state.pages} pages </Label>
    //     </div>
    //     <PDF file={'http://192.168.1.132:3000/' + book.filename}
    //          page={this.state.currentPage}
    //          scale={2}
    //          onDocumentComplete={this._onDocumentCompleted}
    //          onPageComplete={this._onPageComplete}>
    //     </PDF>
    //   </Box>
    //
    // );

    return(
      <div className="ui grid container">
        <div>
          <button className="ui left labeled icon button" onClick={this.prevPage}>
            <i className="left arrow icon"></i>
            Prev
          </button>
          <button className="ui right labeled icon button"  onClick={this.prevPage}>
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
        <PDF file={'http://192.168.1.147:3000/' + book.filename}
             page={this.state.currentPage}
             scale={2}
             onDocumentComplete={this._onDocumentCompleted}
             onPageComplete={this._onPageComplete}>
        </PDF>
      </div>

    );
  }



};

MessageItem.contextTypes = {
  store: PropTypes.object
};

MessageItem.propTypes = {
  messageItem1: PropTypes.shape({
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
  messageItem: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  console.log("messageItem mapStateToProps state: ", state);

  const category = 'messageItem';

  return {
    category: category,
    messageItem1: state.index.getIn(['categories', category])

  };
};


export default connect(mapStateToProps)(MessageItem);

