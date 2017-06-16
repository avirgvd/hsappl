/**
 * Created by govind on 7/16/16.
 */
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../components/Main');
import Home from '../components/Home';
import Medical from '../components/FolderView';
// import Assets from '../components/FolderView';
import Travel from '../components/FolderView';
import Assets from '../components/assets/assets';
import Unknown from '../components/FolderView';
import Financials from '../components/financials/financials';
import Browse from '../components/browse';
import Content from '../components/Content';
import Photos from '../components/photos/photos';
import PhotoFrame from '../components/photos/photoframe';
import Contacts from '../components/contacts/contacts';
import ContactInfo from '../components/contacts/contactinfo';
import FinancialItem from '../components/financials/financialitem';
import DigitalLibrary from '../components/digitallibrary/digitallibrary';
import BookInfo from '../components/digitallibrary/bookinfo';
import Messages from "../components/messages/messages";
import MessageItem from '../components/messages/messageitem';

import Items from '../components/items';
import history from '../RouteHistory';

// var routes = (
//   <Router history={browserHistory}>
//     <Route path='/' component={Main}>
//       <IndexRoute component={Home} />
//       <Route path='/photos' component={Photos} />
//       <Route path='/photoframe' component={PhotoFrame} />
//       <Route path='/contacts' component={Contacts} />
//     </Route>
//   </Router>
// );
var routes = (
  <Router history={history}>
    <Route path='/' component={Main}>
      <IndexRoute component={Browse} />
      <Route path='items' component={Items} />
      <Route path='assets' component={Assets} />
      <Route path='browse' component={Browse} />
      <Route path='content' component={Content} />
      <Route path='photos' component={Photos} />
      <Route path='photoframe' component={PhotoFrame} />
      <Route path='contacts' component={Contacts} />
      <Route path='contactinfo' component={ContactInfo} />
      <Route path='financials' component={Financials} />
      <Route path='medical' component={Medical} />
      <Route path='financialitem' component={FinancialItem} />
      <Route path='digitallibrary' component={DigitalLibrary} />
      <Route path='bookinfo' component={BookInfo} />
      <Route path='messages' component={Messages} />
      <Route path='messageitem' component={MessageItem} />
      <Route path='travel' component={Travel} />
      <Route path='unknown' component={Unknown} />
    </Route>
  </Router>
);

module.exports = routes;