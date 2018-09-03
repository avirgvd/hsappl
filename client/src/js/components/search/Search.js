/**
 * Created by govind on 8/4/17.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Divider, Tab } from 'semantic-ui-react';

import {indexLoad, indexUnLoad, indexNextMore, indexNav} from '../../actions/indexactions';
import Immutable, {Map, List} from 'immutable';

class Search extends Component{

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.onClick = this.onClick.bind(this);

  }

  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount() {
    console.log("Search componentWillMount: this.prop.index: ", this.prop.index);
    // this.props.dispatch(indexLoad("search", {}));

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
    //   this.props.dispatch(indexNextMore(this.props.category, this.props.index));
    // }

  }

  onClick(e) {
    console.log("item clicked ", e);
    // this.props.dispatch(indexNav("/item", "item", e));
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps: ", nextProps);
    // if (nextProps.category && this.props.category !== nextProps.category) {
    //   this.props.dispatch(indexUnload(this.props.index));
    //   this.props.dispatch(
    //     indexLoad(nextProps.category, nextProps.index, this.props.selection));
    // }

  }

  /*
   * This function will be called after render()
   * It is good idea to perform any async operations here as render can show some default
   * content first and this function can asyncronously trigger render() when there is data
   * */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // this.props.dispatch(indexLoad(this.props.category, {}));

  }

  componentWillUnmount() {
    console.log("items componentWillUnmount");

    window.removeEventListener('scroll', this.handleScroll);
    // this.props.dispatch(indexUnLoad(this.props.category, this.props.index));

  }

  render () {
    const { store } = this.context;
    console.log("items this.props: ", this.props);
    // console.log("items this.props: ", this.props.index.getIn(['result']));

    var content =
        <div className="ui list">
          <div className="item">
            <i className="map marker icon"></i>
            <div className="content">
              <a className="header">Krolewskie Jadlo</a>
              <div className="description">An excellent polish restaurant, quick delivery and hearty, filling meals.
              </div>
            </div>
          </div>
          <div className="item">
            <i className="map marker icon"></i>
            <div className="content">
              <a className="header">Xian Famous Foods</a>
              <div className="description">A taste of Shaanxi's delicious culinary traditions, with delights like spicy
                cold noodles and lamb burgers.
              </div>
            </div>
          </div>
          <div className="item">
            <i className="map marker icon"></i>
            <div className="content">
              <a className="header">Sapporo Haru</a>
              <div className="description">Greenpoint's best choice for quick and delicious sushi.</div>
            </div>
          </div>
          <div className="item">
            <i className="map marker icon"></i>
            <div className="content">
              <a className="header">Enid's</a>
              <div className="description">At night a bar, during the day a delicious brunch spot.</div>
            </div>
          </div>
        </div>
      ;

    const panes = [
      { menuItem: 'All', render: () => <Tab.Pane attached={false}>{content}</Tab.Pane> },
      { menuItem: 'Images', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
      { menuItem: 'Videos', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
    ];

    return (
      <div >
        <Divider hidden />
        <Tab
          menu={{ color: 'blue', attached: false, tabular: false }}
          panes={panes}
        />

      </div>
    );
  }
}



// import _ from 'lodash'
// import React, { Component } from 'react'
// import { Divider, Tab } from 'semantic-ui-react'
//
// const colors = [
//   'red', 'orange', 'yellow', 'olive', 'green', 'teal',
//   'blue', 'violet', 'purple', 'pink', 'brown', 'grey',
// ]
//
// const panes = [
//   { menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane> },
//   { menuItem: 'Tab 2', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
//   { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
// ]
//
// class TabExampleColored extends Component {
//   state = { color: colors[0] }
//
//   handleColorChange = e => this.setState({ color: e.target.value })
//
//   render() {
//     const { color } = this.state
//
//     return (
//       <div>
//         <select onChange={this.handleColorChange}>
//           {_.map(colors, c => <option key={c} value={c}>{_.startCase(c)}</option>)}
//         </select>
//
//         <Divider hidden />
//
//         <Tab
//           menu={{ color, attached: false, tabular: false }}
//           panes={panes}
//         />
//       </div>
//     )
//   }
// }
//
// export default TabExampleColored




Search.contextTypes = {
  store: PropTypes.object
};

Search.propTypes = {
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
  console.log("Search: mapStateToProps: state: ", state);
  const category = 'search';

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};

export default connect(mapStateToProps)(Search);
