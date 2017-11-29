/**
 * Created by govind on 11/25/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { indexNav } from '../../actions/indexactions';

import { itemLoad, itemUnload } from '../../actions/itemactions';

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

  _onClick(e) {

    console.log("MessageItem onClick......", this.props.messageitem);
    this.props.onSelect(this.props.messageitem);
    // this.props.dispatch(indexNav("/messageitem", "messageitem", this.props.messageitem));

  }

  _onDocumentCompleted(pages) {
    console.log("_onDocumentCompleted pages: ", pages);

    this.setState({ pages: pages });

  }

  _onPageCompleted(page) {

    this.setState({ currentPage: page });

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
  componentWillMount() {

  }

  /*
   * This function will be called after render()
   * It is good idea to perform any async operations here as render can show some default
   * content first and this function can asyncronously trigger render() when there is data
   * */
  componentDidMount() {
    this.props.dispatch(itemLoad("MessageItem", {}));
  }


  componentWillUnmount() {

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

  render() {
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

  renderListViewItem() {
    console.log("item listview props: ", this.props);
    console.log("item listview props: ", this.props.messageitem);

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
      <div className="item" value={this.props.messageitem.id} onClick={this._onClick}>
        <div className="content">
          <a className="header">{this.props.messageitem.subject}</a>
          <div className="description">{this.props.messageitem['from']}</div>
        </div>
      </div>
    );
  }

  renderSlideViewItem() {


  }

  renderFullView() {
    console.log("messageItem renderFullView props: ", this.props);
    var message = this.props.messageitem1.get('result').get('items');
    console.log("messageItem renderFullView messageItem: ", message);
    console.log("messageItem renderFullView state: ", this.state);

    var attachmentlist;
    if (message.attachment_ids != "") {

      var arrayattachments = message.attachment_ids.split(',');
      attachmentlist = arrayattachments.map((item, index) => {
        console.log("#$$$$$$$", item);

        return (
          <div className="item">
            {item}
          </div>
        );

      });

    }

    return (
      <div className="ui grid container">
        <div className="ui segments">
          <div className="ui segment">

            <select className="ui dropdown">
              <option value="">Action</option>
              <option value="1">Import Photos</option>
              <option value="0">Financials</option>
            </select>
          </div>

          <div className="ui middle segment">
            <p></p>
            <p>From: {message.from}</p>
            <p>To: {message.to}</p>
            <p>Date: {message.date}</p>
            <p>Subject: {message.subject}</p>
            <p></p>
          </div>
          <div className="ui secondary segment">
            <span dangerouslySetInnerHTML={{__html: message.body}} />
          </div>
          <p>Attachments: </p>
          <div className="ui list">
            {attachmentlist}
          </div>
        </div>
      </div>

    );
  }



};

MessageItem.contextTypes = {
  store: PropTypes.object
};

MessageItem.propTypes = {
  messageitem1: PropTypes.shape({
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
  messageitem: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  const category = 'messageitem';

  console.log("messageItem mapStateToProps state: ", state);


  return {
    category: category,
    messageitem1: state.index.getIn(['categories', category])

  };
};


export default connect(mapStateToProps)(MessageItem);

