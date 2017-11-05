/**
 * Created by govind on 8/5/17.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {indexNav, indexLoad, indexUnLoad} from '../actions/indexactions';
import {filesServerBaseURL} from '../Api';

class Cards extends Component {

  constructor() {
    super();
    console.log("Cards");
    this.onTileClick= this.onTileClick.bind(this);
  }

  onTileClick (event) {
    console.log("on tile click: ", event.target);
    console.log("on tile click: ", event.target.getAttribute('name'));
    this.props.dispatch(indexNav(event.target.getAttribute('name'), event.target.getAttribute('name')));

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

    var resource = this.props.index.getIn(['resource']);
    console.log("Cards: componentDidMount resource", resource);

    // this.props.dispatch(indexLoad("photocards", this.props.index));
    this.props.dispatch(indexLoad("cards", resource));

  }


  render () {
    const { store } = this.context;

    console.log("cards this.props: ", this.props);
    console.log("cards this.props: ", this.props.index.getIn(['result']));

    var items = this.props.index.get('result').get('items');

    let elements = items.map((item, index) => {
      console.log("Cards: render item: ", item);

      return(
        <div className="ui link card" >
          <div className="image" >
            <img src={ filesServerBaseURL() + item.cardimageid} className="ui fluid floated image" name="photos"></img>
          </div>
          <div className="content" >
            <div className="header">{item.caption}</div>
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

    console.log("Cards: elements: ", elements);

    return (
      <div className="ui equal width center aligned padded grid" featureName="potos" >
        <div className="ui stackable cards" onClick={this.onTileClick}>
          {elements}
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
  const category = 'cards';

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};


export default connect(mapStateToProps)(Cards);