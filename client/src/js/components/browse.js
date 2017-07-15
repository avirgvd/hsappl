/**
 * Created by govind on 9/19/16.
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {indexNav} from '../actions/indexactions';
import {filesServerBaseURL} from '../Api';

class Browse extends Component {

  constructor() {
    super();
    console.log("Browse");
    this.onTileClick= this.onTileClick.bind(this);
  }

  onTileClick (event) {
    console.log("on tile click: ", event.target);
    console.log("on tile click: ", event.target.getAttribute('name'));
    this.props.dispatch(indexNav(event.target.getAttribute('name'), event.target.getAttribute('name'), event));

  }


  render () {
    return (
      <div className="ui equal width center aligned padded grid" featureName="potos" >
        <div className="ui stackable cards" onClick={this.onTileClick}>
          <div className="ui link card"  >
            <div className="image" >
              <img src={ filesServerBaseURL("system") + "Contacts.jpg"} className="ui fluid floated image" name="contacts"></img>
            </div>
            <div className="content" >
              <div className="header">Contacts</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card" >
            <div className="image" >
              <img src={ filesServerBaseURL("system") + "Photos.jpeg"} className="ui fluid floated image" name="photos"></img>
            </div>
            <div className="content" >
              <div className="header">Photos</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ filesServerBaseURL("system") + "Digital_Library.jpeg"} className="ui fluid floated image" name="digitallibrary"></img>
            </a>
            <div className="content" >
              <div className="header">Digital Library</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ filesServerBaseURL("system") + "Financials.jpeg"} className="ui fluid floated image" name="financials"></img>
            </a>
            <div className="content" >
              <div className="header">Financials</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ filesServerBaseURL("system") + "Medicals.jpg"} className="ui fluid floated image" name="medical" ></img>
            </a>
            <div className="content" >
              <div className="header">Medical Records</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ filesServerBaseURL("system") + "Travel.jpeg"} className="ui fluid floated image" name="travel"></img>
            </a>
            <div className="content" >
              <div className="header">Travel</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ filesServerBaseURL("system") + "Assets.jpg"} className="ui fluid floated image" name="assets"></img>
            </a>
            <div className="content" >
              <div className="header">Assets</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
          <div className="ui link card">
            <a class="image" >
              <img src={ filesServerBaseURL("system") + "Uncategorized.jpg"} className="ui fluid floated image" name="unknown"></img>
            </a>
            <div className="content" >
              <div className="header">Unknown</div>
              <div className="meta">
                <span className="category">Count 123</span>
              </div>
              <div className="description">
                <p></p>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }

};

Browse.contextTypes = {
  store: PropTypes.object
};

Browse.propTypes = {
  browseitem1: PropTypes.shape({
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
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  const category = 'browse';

  return {
    category: category,
    contactitem1: state.index.getIn(['categories', category])

  };
};


export default connect(mapStateToProps)(Browse);