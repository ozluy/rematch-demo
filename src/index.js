import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import * as serviceWorker from './serviceWorker'
import Sayac from './components/Sayac'
import GitHub from './components/GitHub'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Sayac />
    <GitHub />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
