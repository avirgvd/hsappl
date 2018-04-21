/**
 * Created by govind on 11/25/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
var Modal = require('react-modal');
import MessageItem from './messageitem';

// import List from 'grommet/components/List';
// import ListItem from 'grommet/components/ListItem';

import {indexLoad, indexUnLoad, indexNextMore, indexNav} from '../../actions/indexactions';
import {itemNav} from '../../actions/itemactions';


class Messages extends Component{

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.state = {query: {}};

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
      this.props.dispatch(indexNextMore("messages", this.props.index, {query: this.state.query}));
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
    this.props.dispatch(indexLoad("messages", {}));
  }

  componentWillUnmount() {
    console.log("messages componentWillUnmount");
    window.removeEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexUnLoad("messages", this.props.index));

  }

  onSelect(messageitem) {
    console.log("messages onSelect: ", messageitem);
    // this.props.dispatch(indexNav("/messageitem", "messageitem", messageitem));
    this.props.dispatch(itemNav("/messageitem", "messageitem", messageitem));
  }



  render () {
    const { store } = this.context;
    console.log("messages this.props: ", this.props);

    var items = this.props.index.get('result').get('items');

    let elements = items.map((item, index) => {
      console.log("messages render item: ", item);
      console.log("messages render index: ", index);

      return (

        <MessageItem messageitem={item} view='listview' onSelect={this.onSelect}/>
      );
    });

    console.log("elements: ", elements);

    // var modal = this._showModal(this.props.index.get('showModal'));

    return (
      <div className="ui container">
        <div className="ui relaxed divided list">
          {elements}
        </div>
      </div>
    );
  }
}

Messages.contextTypes = {
  store: PropTypes.object
};

Messages.propTypes = {
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
  const category = 'messages';
  console.log("messages mapStateToProps: state: ", state);

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};

export default connect(mapStateToProps)(Messages);
