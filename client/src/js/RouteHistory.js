/**
 * Created by govind on 9/15/16.
 */

import { createHistory, useQueries } from 'history';
// import { browserHistory } from 'react-router';

export default useQueries(createHistory)();
