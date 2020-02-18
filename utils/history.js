/**
 * Created by jithin on 03/02/20.
 */
import { createBrowserHistory } from 'history';
import queryString from 'query-string';

const browserHistory = createBrowserHistory();

export default {
  __browserHistory: browserHistory,
  push: (path, queryParams) => browserHistory.push(`${path}?${queryString.stringify(queryParams)}`),
};
