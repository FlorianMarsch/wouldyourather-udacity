import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import RootView from './components/root/RootView';
import AddPullView from './components/add/AddPullView';
import LeaderboardView from './components/leaderboard/LeaderboardView';
import PullView from './components/questions/PullView';

const logger = store => next => action => {
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, logger))
);
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <div>
        < Route
          exact
          path="/"
          render={
            props => (
              <App >
                <RootView {...props} />
              </App>
            )
          }
        />

        <Route
          path="/leaderboard"
          render={props => (
            <App>
              <LeaderboardView {...props} />
            </App>
          )}
        />
        <Route
          path="/add"
          render={props => (
            <App>
              <AddPullView {...props} />
            </App>
          )}
        /> <Route
          path="/questions/:id"
          render={props => (
            <App>
              <PullView {...props} />
            </App>
          )}
        />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
