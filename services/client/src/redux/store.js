import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

// const store = createStore(
//     reducer, 
//     this.state,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

export default store