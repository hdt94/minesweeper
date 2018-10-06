import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash.throttle';
import rootReducer from './reducers';

const loadState = () => {
  try {
    const serialized = localStorage.getItem('state');

    if (!serialized) {
      return undefined;
    }

    return JSON.parse(serialized);
  } catch (err) {
    return undefined;
  }
};
const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);

    localStorage.setItem('state', serialized);
  } catch (err) {
    console.error(err);
  }
};
const store = createStore(
  rootReducer,
  loadState(),
  composeWithDevTools(),
);

store.subscribe(throttle(() => saveState(store.getState()), 1000));

export default store;
