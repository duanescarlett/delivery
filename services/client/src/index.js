import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './redux/reducer'
import './index.css'
import App from './App'
// import * as serviceWorker from './serviceWorker';

// Create the redux store
const store = createStore(reducer)

// Wrap React with Redux and start the app
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
